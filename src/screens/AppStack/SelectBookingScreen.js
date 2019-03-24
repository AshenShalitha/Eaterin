import React, { Component } from 'react';
import {
    Dimensions,
    View,
    Text,
    FlatList,
    AsyncStorage,
    NetInfo,
    InteractionManager,
    TouchableOpacity
} from 'react-native';
import {
    Icon,
} from 'native-base';
import moment from 'moment';
import { connect } from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import { SkypeIndicator } from 'react-native-indicators';

import { colors } from '../../utils/Colors';
import { strings } from '../../utils/Strings';
import { CustomHeader } from '../../components/CustomHeader';
import { DatesGroup } from '../../components/DatesGroup';
import { GuestView } from '../../components/GuestView';
import { TimeSlotItem } from '../../components/TimeSlotItem';
import { AlertPopUp } from '../../components/AlertPopUp';
import { OfflineNotice } from '../../components/OfflineNotice';
import * as actions from '../../redux/actions';
import { PROTOCOL, HOST } from '../../api/API';

const entireScreenWidth = Dimensions.get('window').width;
const entireScreenHeight = Dimensions.get('window').height;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

let disableArray = [];

class SelectBookingScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            incrementDisabled: false,
            decrementDisabled: false,
            modalVisible: false,
            isDisabled: false,
        };
        this.isConnected = true;
        NetInfo.isConnected.fetch().then(isConnected => {
            this.isConnected = isConnected;
        });
    }

    componentDidMount() {
        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
        this.interaction = InteractionManager.runAfterInteractions(() => {
            this.fetchTimeSlots(moment().format('dddd'));
        });
        this.props.guestCountChanged(1);
    }

    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
        if (this.interaction) this.interaction.cancel();
        disableArray = [];
    }

    handleConnectivityChange = isConnected => {
        if (isConnected) {
            this.isConnected = isConnected;
        } else {
            this.isConnected = isConnected;
        }
    };

    incrementPressed() {
        this.setState({ decrementDisabled: false });
        if (this.props.numberOfGuests >= this.props.selectedRestaurant.max_guests) {
            this.setState({ incrementDisabled: true });
        } else {
            this.props.guestsIncreased(this.props.numberOfGuests);
            this.checkDisable(this.props.numberOfGuests + 1);
        }
    }

    decrementPressed() {
        this.setState({ incrementDisabled: false });
        if (this.props.numberOfGuests < this.props.selectedRestaurant.min_guests + 1) {
            this.setState({ decrementDisabled: true });
        } else {
            this.props.guestsDecreased(this.props.numberOfGuests);
            this.checkDisable(this.props.numberOfGuests - 1);
        }
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

    onTimeSlotPressed(item) {
        this.checkLoggedInStatus(item);
    }

    dateSelected(date) {
        this.props.dateSelected(date);
        this.fetchTimeSlots(moment(new Date(date)).format('dddd'));
    }

    fetchTimeSlots(date) {
        // const day = moment(new Date(date)).format('dddd');
        this.props.fetchTimeSlots(this.props.selectedRestaurant.id, date);
    }

    renderItem(item) {
        let disabled;
        disableArray.map(element => {
            if (element.id === item.item.time_slot_id) {
                disabled = element.isDisabled;
            }
            return null;
        })
        return (
            <TimeSlotItem
                timeSlotId={item.item.time_slot_id}
                timeSlot={item.item.time}
                discount={item.item.discount}
                onItemPressed={() => this.onTimeSlotPressed(item.item)}
                isValueDeal={item.item.is_value_deal}
                paxCount={item.item.available_pax_count}
                disabled={disabled}
                currentPaxCount={this.props.numberOfGuests}
            />
        );
    }

    checkDisable(paxCount) {
        this.props.timeSlots.forEach(element => {
            let item = {};
            let isDuplicate = false;
            if (paxCount > element.available_pax_count) {
                this.setState({ isDisabled: true });
                for (let i = 0; i < disableArray.length; i++) {
                    if (disableArray[i].id === element.time_slot_id) {
                        isDuplicate = true;
                        return;
                    } else {
                        isDuplicate = false;
                    }
                }
                if (!isDuplicate) {
                    item.isDisabled = true;
                    item.id = element.time_slot_id;
                    disableArray.push(item);
                    item = {};
                }
            } else {
                this.setState({ isDisabled: false });
                for (let j = 0; j < disableArray.length; j++) {
                    if (disableArray[j].id === element.time_slot_id) {
                        disableArray.splice(j, 1);
                    }
                }
            }
        });
    }

    renderTimeSlots() {
        if (this.isConnected) {
            if (this.props.timeSlotsLoading) {
                return (
                    <SkypeIndicator color={colors.green_light} size={EStyleSheet.value('40rem')} />
                );
            } else if (this.props.timeSlotError) {
                return (
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>{this.props.timeSlotErrorMessage}</Text>
                    </View>
                );
            } else {
                return (
                    <FlatList
                        data={this.props.timeSlots}
                        renderItem={this.renderItem.bind(this)}
                        keyExtractor={item => item.time_slot_id.toString()}
                        extraData={this.state}
                    />
                );
            }
        } else if (!this.isConnected) {
            return (
                <View style={styles.errorContainer}>
                    <TouchableOpacity onPress={() => this.fetchTimeSlots(moment(new Date(this.props.selectedDate)).format('dddd'))}>
                        <Text style={styles.errorText}>{strings.errors.noInternet} {'\n'}{strings.errors.retry}</Text>
                    </TouchableOpacity>
                </View>
            );
        }

    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <OfflineNotice />
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
                    {this.renderTimeSlots()}
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
    },
    errorContainer: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
    errorText: {
        textAlign: 'center',
        paddingVertical: '5rem',
    }
});

const mapStateToProps = state => {
    return {
        numberOfGuests: state.booking.numberOfGuests,
        selectedRestaurant: state.booking.selectedRestaurant,
        selectedDate: state.booking.selectedDate,
        timeSlots: state.booking.timeSlots,
        timeSlotsLoading: state.booking.timeSlotsLoading,
        timeSlotError: state.booking.timeSlotError,
        timeSlotErrorMessage: state.booking.timeSlotErrorMessage
    };
};

export default connect(mapStateToProps, actions)(SelectBookingScreen);
