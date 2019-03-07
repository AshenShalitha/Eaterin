import React, { Component } from 'react';
import {
    Dimensions,
    View,
    Text,
    FlatList
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
import * as actions from '../../redux/actions';
import { PROTOCOL, HOST } from '../../api/API';

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

class SelectBookingScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            incrementDisabled: false,
            decrementDisabled: false
        };
        this.max = 8;
    }

    componentDidMount() {
        this.props.guestCountChanged(1);
    }

    incrementPressed() {
        this.setState({ decrementDisabled: false });
        if (this.props.numberOfGuests >= this.max) {
            this.setState({ incrementDisabled: true });
        } else {
            this.props.guestsIncreased(this.props.numberOfGuests);
        }
    }

    decrementPressed() {
        this.setState({ incrementDisabled: false });
        if (this.props.numberOfGuests < 2) {
            this.setState({ decrementDisabled: true });
        } else {
            this.props.guestsDecreased(this.props.numberOfGuests);
        }
    }

    onTimeSlotPressed(item) {
        this.props.timeSlotSelected(item);
        this.props.navigation.navigate('ConfirmBookingScreen');
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
    }
});

const mapStateToProps = state => {
    return {
        numberOfGuests: state.booking.numberOfGuests,
        selectedRestaurant: state.booking.selectedRestaurant,
    };
};

export default connect(mapStateToProps, actions)(SelectBookingScreen);
