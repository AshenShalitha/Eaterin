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
            paxModalVisible: false,
        };
        this.triggerArray = false;
        this.isConnected = true;
        NetInfo.isConnected.fetch().then(isConnected => {
            this.isConnected = isConnected;
        });
    }

    componentDidMount() {
        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
        this.interaction = InteractionManager.runAfterInteractions(() => {
            this.fetchTimeSlots(moment().format('dddd'), moment().format('YYYY-MM-DD'));
            this.props.dateSelected(moment().format('MM/DD/YYYY'));
        });
        this.props.guestCountChanged(0);
    }

    componentDidUpdate() {
        if (this.props.timeSlotSuccess) {
            this.filterConcurrentTimeSlots();
        }
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
        if (this.props.numberOfGuests >= this.props.selectedRestaurant.no_of_bookings_per_person) {
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
                if (this.props.numberOfGuests === 0) {
                    this.setState({ paxModalVisible: true });
                } else {
                    this.props.timeSlotSelected(item);
                    this.props.navigation.navigate('ConfirmBookingScreen');
                }
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
        this.fetchTimeSlots(moment(new Date(date)).format('dddd'), moment(new Date(date)).format('YYYY-MM-DD'));
        this.props.guestCountChanged(0);
        this.checkDisable(1);
    }

    fetchTimeSlots(day, date) {
        // const day = moment(new Date(date)).format('dddd');
        this.props.fetchTimeSlots(this.props.selectedRestaurant.id, day, date);
    }

    toggleFlatListRender() {
        this.triggerArray = !this.triggerArray;
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
                this.toggleFlatListRender();
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
                this.toggleFlatListRender();
                for (let j = 0; j < disableArray.length; j++) {
                    if (disableArray[j].id === element.time_slot_id && !disableArray[j].isConcurrent) {
                        disableArray.splice(j, 1);
                    }
                }
            }
        });
    }

    filterConcurrentTimeSlots() {
        const timeSlots = this.setTimeslotArray(this.props.timeSlots);
        const { upcomingBookings } = this.props;
        let item = {};
        for (let i = 0; i < timeSlots.length; i++) {
            for (let j = 0; j < upcomingBookings.length; j++) {
                if (upcomingBookings[j].time === timeSlots[i].time) {
                    item.isDisabled = true;
                    item.id = timeSlots[i].time_slot_id;
                    item.isConcurrent = true;
                    disableArray.push(item);
                    item = {};
                    this.toggleFlatListRender();
                }
            }
        }
    }

    setTimeslotArray(timeSlots) {
        //filter 0 pax timeslots
        const filteredTimeSlots = timeSlots.filter(timeSlot => {
            return timeSlot.available_pax_count > 0;
        });
        //check is date is today
        if (moment(this.props.selectedDate).isSame(moment().format('MM/DD/YYYY'))) {
            //round up current time to nearest 2 hours
            const currentTime = moment();
            // const minutesDifference = 30 - (currentTime.minute() % 30);
            // const currentTimeRoundedUp = moment(currentTime).add(minutesDifference, 'minutes').format('HH:mm');
            const roundedUpTwoHours = moment(currentTime, 'HH:mm').add(2, 'h').format('HH:mm');
            //filter past timeslots
            const newTimeSlots = filteredTimeSlots.filter(timeSlot => {
                if (moment(currentTime, 'HH:mm').isAfter(moment('22:00', 'HH:mm'))) {
                    return null;
                } else if (moment(timeSlot.time, 'HH:mm').isAfter(moment(roundedUpTwoHours, 'HH:mm'))) {
                    return timeSlot;
                }
                return null;
            });
            this.toggleFlatListRender();
            return newTimeSlots;
        }
        this.toggleFlatListRender();
        return filteredTimeSlots;
    }

    renderTimeSlots() {
        const currentTime = moment();
        if (this.isConnected) {
            if (this.props.timeSlotsLoading) {
                return (
                    <SkypeIndicator color={colors.green_light} size={EStyleSheet.value('40rem')} />
                );
            } else if (moment(currentTime, 'HH:mm').isAfter(moment('20:00', 'HH:mm')) &&
                moment(this.props.selectedDate).isSame(moment().format('MM/DD/YYYY'))) {
                return (
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>Online bookings unavailable after 10:00 PM</Text>
                    </View>
                );
            } else if (this.props.timeSlotError) {
                return (
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>{this.props.timeSlotErrorMessage}</Text>
                    </View>
                );
            } else if (this.props.isHollyday) {
                return (
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>Time slots not available</Text>
                    </View>
                );
            } else {
                return (
                    this.setTimeslotArray(this.props.timeSlots).length === 0 ?
                        < View style={styles.errorContainer} >
                            <Text style={styles.errorText}>Time slots not available</Text>
                        </View >
                        :
                        <FlatList
                            data={this.setTimeslotArray(this.props.timeSlots)}
                            renderItem={this.renderItem.bind(this)}
                            keyExtractor={item => item.time_slot_id.toString()}
                            extraData={this.triggerArray}
                        />
                );
            }
        } else if (!this.isConnected) {
            return (
                <View style={styles.errorContainer}>
                    <TouchableOpacity
                        onPress={() => {
                            this.fetchTimeSlots(moment(new Date(this.props.selectedDate)).format('dddd'), moment(new Date(this.props.selectedDate)).format('YYYY-MM-DD'));
                        }}
                    >
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
                    image={this.props.selectedRestaurant.image_url}
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
                <AlertPopUp
                    isVisible={this.state.paxModalVisible}
                    onBackdropPress={() => this.setState({ paxModalVisible: false })}
                    onBackButtonPress={() => this.setState({ paxModalVisible: false })}
                    title={strings.errors.alert}
                    text={strings.errors.paxCountError}
                    buttonText={'ok'}
                    buttonCount={1}
                    onPress={() => this.setState({ paxModalVisible: false })}
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
        timeSlotErrorMessage: state.booking.timeSlotErrorMessage,
        upcomingBookings: state.booking.upcomingBookings,
        timeSlotSuccess: state.booking.timeSlotSuccess,
        reRender: state.booking.reRender,
        isHollyday: state.booking.isHollyday
    };
};

export default connect(mapStateToProps, actions)(SelectBookingScreen);
