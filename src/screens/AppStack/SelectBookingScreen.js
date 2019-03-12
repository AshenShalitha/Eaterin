import React, { Component } from 'react';
import {
    Dimensions,
    View,
    Text,
    FlatList,
    AsyncStorage,
    InteractionManager
} from 'react-native';
import {
    Icon,
} from 'native-base';
import { connect } from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';

import { colors } from '../../utils/Colors';
import { strings } from '../../utils/Strings';
import { timeSlots } from '../../utils/mockData';
import { CustomHeader } from '../../components/CustomHeader';
import { DatesGroup } from '../../components/DatesGroup';
import { GuestView } from '../../components/GuestView';
import { TimeSlotItem } from '../../components/TimeSlotItem';
import { AlertPopUp } from '../../components/AlertPopUp';
import * as actions from '../../redux/actions';
import { PROTOCOL, HOST } from '../../api/API';

const entireScreenWidth = Dimensions.get('window').width;
const entireScreenHeight = Dimensions.get('window').height;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

class SelectBookingScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            incrementDisabled: false,
            decrementDisabled: false,
            modalVisible: false,
        };
    }

    componentDidMount() {
        this.props.guestCountChanged(1);
    }

    fetchTimeSlots() {
        this.props.fetchTimeSlots(this.props.selectedRestaurant.id);
    }

    incrementPressed() {
        this.setState({ decrementDisabled: false });
        if (this.props.numberOfGuests >= this.props.selectedRestaurant.max_guests) {
            this.setState({ incrementDisabled: true });
        } else {
            this.props.guestsIncreased(this.props.numberOfGuests);
        }
    }

    decrementPressed() {
        this.setState({ incrementDisabled: false });
        if (this.props.numberOfGuests < this.props.selectedRestaurant.min_guests + 1) {
            this.setState({ decrementDisabled: true });
        } else {
            this.props.guestsDecreased(this.props.numberOfGuests);
        }
    }

    onTimeSlotPressed(item) {
        this.checkLoggedInStatus(item);
    }

    checkLoggedInStatus(item) {
        AsyncStorage.getItem('accessToken').then(accessToken => {
            this.setState({ hasToken: accessToken !== null });
        }).then(() => {
            if (this.state.hasToken) {
                this.props.timeSlotSelected(item);
                this.props.navigation.navigate('ConfirmBookingScreen');
            } else {
                this.setState({ modalVisible: true });
            }
        });
    }

    onLoginPressed() {
        this.setState({ modalVisible: true });
        this.props.navigation.navigate('Auth');
    }

    dateSelected(date) {
        this.props.dateSelected(date);
    }

    renderItem(item) {
        return (
            <TimeSlotItem
                timeSlot={item.item.timeSlot}
                discount={item.item.discount}
                onItemPressed={() => this.onTimeSlotPressed(item.item)}
            />
        );
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <CustomHeader
                    image={`${PROTOCOL}${HOST}${this.props.selectedRestaurant.image_url}`}
                    restaurantName={this.props.selectedRestaurant.name}
                    ratings={this.props.selectedRestaurant.ratings}
                    address={this.props.selectedRestaurant.address}
                    onBackPressed={() => this.props.navigation.pop()}
                />
                <View style={styles.dateContainer}>
                    <DatesGroup
                        onDateChanged={date => this.dateSelected(date)}
                    />
                </View>
                <View style={styles.guestsContainer}>
                    <GuestView
                        numberOfGuests={this.props.numberOfGuests}
                        onIncrementPressed={this.incrementPressed.bind(this)}
                        onDecrementPressed={this.decrementPressed.bind(this)}
                        decrementDisabled={this.state.decrementDisabled}
                        incrementDisabled={this.state.incrementDisabled}

                    />
                </View>
                <View style={styles.timeSlotContainer}>
                    <View style={styles.titleContainer}>
                        <Icon name={'ios-clock'} type={'Ionicons'} style={styles.iconStyle} />
                        <Text style={styles.title}>{strings.selectBooking.timeSlotTitle}</Text>
                    </View>
                    <FlatList
                        data={timeSlots}
                        renderItem={this.renderItem.bind(this)}
                        keyExtractor={item => item.timeSlot.toString()}
                    />
                </View>
                <AlertPopUp
                    isVisible={this.state.modalVisible}
                    onBackdropPress={() => this.setState({ modalVisible: false })}
                    onBackButtonPress={() => this.setState({ modalVisible: false })}
                    title={strings.errors.alert}
                    text={strings.errors.loginError}
                    buttonText={strings.login.buttonText}
                    buttonCount={1}
                    onPress={() => this.onLoginPressed()}
                    iconName={'alert-circle'}
                    iconType={'Feather'}
                />
            </View>
        );
    }
}

const styles = EStyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    dateContainer: {
        flex: 1.1,
        justifyContent: 'flex-end',
    },
    guestsContainer: {
        flex: 1,
        backgroundColor: colors.ash_light
    },
    timeSlotContainer: {
        flex: 4,
        backgroundColor: colors.white
    },
    titleContainer: {
        height: '22rem',
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconStyle: {
        fontSize: '13rem',
        color: colors.black,
        paddingHorizontal: '8rem'
    },
    title: {
        fontSize: '12rem',
        color: colors.ash_dark,
    },
    modal: {
        height: entireScreenHeight * 0.28,
        width: entireScreenWidth * 0.8,
        backgroundColor: colors.white,
        alignSelf: 'center',
        borderRadius: '10rem'
    },
    modalUpper: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: colors.green_light,
        borderTopLeftRadius: '10rem',
        borderTopRightRadius: '10rem'
    },
    modalMiddle: {
        flex: 0.8,
        justifyContent: 'space-around'
    },
    modalBottom: {
        flex: 0.8,
        justifyContent: 'center',
        borderBottomLeftRadius: '10rem',
        borderBottomRightRadius: '10rem'
    },
    modalTitleStyle: {
        fontSize: '20rem',
        color: colors.black,
        alignSelf: 'center',
        fontWeight: '500'
    },
    modalTextStyle: {
        fontSize: '13rem',
        color: colors.ash_dark,
        alignSelf: 'center'
    },
    buttonStyle: {
        backgroundColor: colors.green_light,
        height: '25rem',
        width: '120rem',
        alignSelf: 'center'
    },
    buttonTextStyle: {
        color: colors.white,
        fontWeight: '300',
        fontSize: '13rem',
        alignSelf: 'center'
    },
    closeIcon: {
        color: colors.white,
        fontSize: '40rem',
        alignSelf: 'center'
    }
});

const mapStateToProps = state => {
    return {
        numberOfGuests: state.booking.numberOfGuests,
        selectedRestaurant: state.booking.selectedRestaurant,
    };
};

export default connect(mapStateToProps, actions)(SelectBookingScreen);
