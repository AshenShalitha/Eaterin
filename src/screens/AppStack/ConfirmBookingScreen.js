import React, { Component } from 'react';
import {
    Dimensions,
    View,
    ScrollView,
    Text,
    NetInfo,
    Linking
} from 'react-native';
import {
    Button
} from 'native-base';
import moment from 'moment';
import { connect } from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';

import { CustomHeader } from '../../components/CustomHeader';
import { BookingSummary } from '../../components/BookingSummary';
import { AlertPopUp } from '../../components/AlertPopUp';
import { OfflineNotice } from '../../components/OfflineNotice';
import { colors } from '../../utils/Colors';
import * as actions from '../../redux/actions';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { PRIVACY, TERMS } from '../../api/API';

const entireScreenWidth = Dimensions.get('window').width;
const entireScreenHeight = Dimensions.get('window').height;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

class ConfirmBookingScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            noInternet: false,
            disabled: false
        };
        this.isConnected = true;
        NetInfo.isConnected.fetch().then(isConnected => {
            this.isConnected = isConnected;
        });
    }

    componentDidMount() {
        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
    }

    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
        if (this.interaction) this.interaction.cancel();
    }

    handleConnectivityChange = isConnected => {
        if (isConnected) {
            this.isConnected = isConnected;
        } else {
            this.isConnected = isConnected;
        }
    };

    onNextPressed() {
        if (this.isConnected) {
            this.setState({
                modalVisible: true
            });
        } else {
            this.setState({
                noInternet: true
            });
        }
    }

    closeModal() {
        this.setState({
            modalVisible: false
        });
    }

    noInternetPopupCancelled() {
        this.setState({
            noInternet: false
        });
    }

    onOkPressed() {
        this.setState({ disabled: true });
        const { id: restaurantId } = this.props.selectedRestaurant;
        const { time, discount, time_slot_id: timeSlotId } = this.props.selectedTimeSlotObj;
        const { id: userId, selectedDate, numberOfGuests, name, email, contactNo, accessToken } = this.props;
        const date = moment(new Date(selectedDate), 'MM/DD/YYYY', true).format('YYYY-MM-DD');
        console.log(numberOfGuests);
        this.props.addBooking(
            restaurantId,
            userId,
            date,
            time,
            numberOfGuests,
            discount,
            name,
            email,
            contactNo,
            timeSlotId,
            accessToken
        );
        this.closeModal();
        this.props.navigation.navigate('FinishBookingScreen');
    }

    onPrivacyPressed() {
        Linking.canOpenURL(PRIVACY).then(supported => {
            if (supported) {
                Linking.openURL(PRIVACY);
            } else {
                console.log("Don't know how to open URI: " + this.props.url);
            }
        });
    }

    onTermsPressed() {
        Linking.canOpenURL(TERMS).then(supported => {
            if (supported) {
                Linking.openURL(TERMS);
            } else {
                console.log("Don't know how to open URI: " + this.props.url);
            }
        });
    }

    render() {
        return (
            <ScrollView style={styles.mainContainer} contentContainerStyle={styles.contentContainerStyle}>
                <OfflineNotice />
                <CustomHeader
                    image={this.props.selectedRestaurant.image_url}
                    restaurantName={this.props.selectedRestaurant.name}
                    ratings={this.props.selectedRestaurant.ratings}
                    address={this.props.selectedRestaurant.address}
                    onBackPressed={() => this.props.navigation.pop()}
                />
                <View style={{ flex: 6.1 }}>
                    <BookingSummary
                        date={moment(new Date(this.props.selectedDate), 'MM/DD/YYYY', true).format('DD MMM YYYY')}
                        time={this.props.selectedTimeSlotObj.time}
                        paxCount={this.props.numberOfGuests}
                        discount={this.props.selectedTimeSlotObj.discount}
                    />
                    <View style={styles.bottomContainer}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>Customer details</Text>
                            <Text style={styles.subTitle}>Following details will be helpful for restaurant to make the reservation</Text>
                        </View>
                        <View style={styles.userDetailsContainer}>
                            <View style={styles.itemRow}>
                                <Text style={styles.textAsh}>Full Name</Text>
                                <Text style={styles.textBlack}>{this.props.name}</Text>
                            </View>
                            <View style={styles.itemRow}>
                                <Text style={styles.textAsh}>Telephone Number</Text>
                                <Text style={styles.textBlack}>{this.props.contactNo}</Text>
                            </View>
                            <View style={styles.itemRow}>
                                <Text style={styles.textAsh}>Email Address</Text>
                                <Text style={styles.textBlack}>{this.props.email}</Text>
                            </View>
                        </View>
                        <View style={styles.footerContainer}>
                            <Button block style={styles.buttonStyle} onPress={() => this.onNextPressed()}>
                                <Text style={styles.buttonTextStyle}>Next</Text>
                            </Button>
                            <View style={styles.footerTextContainer}>
                                <Text style={styles.footerText}>
                                    By clicking next, you agree to our
                                </Text>
                                <TouchableOpacity onPress={() => this.onTermsPressed()}>
                                    <Text style={[styles.footerText, { color: '#5887d3' }]}> terms and conditions </Text>
                                </TouchableOpacity>
                                <Text style={styles.footerText}>and</Text>
                                <TouchableOpacity onPress={() => this.onPrivacyPressed()}>
                                    <Text style={[styles.footerText, { color: '#5887d3' }]}> Privacy policy </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
                <AlertPopUp
                    isVisible={this.state.modalVisible}
                    onBackdropPress={() => this.closeModal()}
                    onBackButtonPress={() => this.closeModal()}
                    title={'Confirm'}
                    text={'Press Ok to confirm the reservation'}
                    positiveButtonText={'Ok'}
                    negativeButtonText={'Cancel'}
                    buttonCount={2}
                    iconName={'infocirlceo'}
                    iconType={'AntDesign'}
                    onPositivePress={() => this.onOkPressed()}
                    onNegativePress={() => this.closeModal()}
                    disabled={this.state.disabled}
                />
                <AlertPopUp
                    isVisible={this.state.noInternet}
                    onBackdropPress={() => this.noInternetPopupCancelled()}
                    onBackButtonPress={() => this.noInternetPopupCancelled()}
                    title={'Reservation Failed'}
                    text={'No internet connection!'}
                    buttonText={'Ok'}
                    buttonCount={1}
                    onPress={() => this.noInternetPopupCancelled()}
                    iconName={'alert-circle'}
                    iconType={'Feather'}
                />
            </ScrollView >
        );
    }
}

const styles = EStyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    contentContainerStyle: {
        height: entireScreenHeight * 1,
        backgroundColor: colors.white
    },
    topContainer: {
        flex: 1.8,
        backgroundColor: colors.ash_light
    },
    bottomContainer: {
        flex: 3
    },
    topContentContainer: {
        flex: 1,
        backgroundColor: colors.white,
        marginBottom: '8rem',
        paddingTop: '40rem',
        paddingBottom: '8rem',
        paddingHorizontal: '25rem'
    },
    itemRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: '5rem',
    },
    textAsh: {
        fontSize: '13rem',
        color: colors.ash_dark,
        alignSelf: 'center'
    },
    textBlack: {
        fontSize: '13rem',
        color: colors.black,
        fontWeight: '500',
        alignSelf: 'center'
    },
    textGreen: {
        fontSize: '13rem',
        color: colors.green_light,
        fontWeight: '500'
    },
    titleContainer: {
        flex: 1,
        paddingHorizontal: '25rem'
    },
    userDetailsContainer: {
        flex: 2.4,
        paddingHorizontal: '25rem',
        paddingVertical: '20rem',
        justifyContent: 'center'
    },
    footerContainer: {
        flex: 1.6,
        paddingHorizontal: '25rem',
        justifyContent: 'space-around',
    },
    title: {
        fontSize: '14rem',
        color: colors.black,
        paddingVertical: '6rem',
        fontWeight: '500'
    },
    subTitle: {
        fontSize: '11rem',
        color: colors.ash_dark
    },
    buttonStyle: {
        backgroundColor: colors.green_light,
        height: '35rem',
    },
    buttonTextStyle: {
        color: colors.white,
        fontWeight: '300',
        fontSize: '14rem',
        alignSelf: 'center'
    },
    footerText: {
        fontSize: '9rem',
        color: colors.ash_dark,
        alignSelf: 'center'
    },
    footerTextContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
    }
});

const mapStateToProps = state => {
    return {
        numberOfGuests: state.booking.numberOfGuests,
        selectedRestaurant: state.booking.selectedRestaurant,
        selectedTimeSlotObj: state.booking.selectedTimeSlotObj,
        selectedDate: state.booking.selectedDate,
        id: state.profile.id,
        name: state.profile.name,
        contactNo: state.profile.contactNo,
        email: state.profile.email,
        accessToken: state.profile.accessToken,
        reservationError: state.booking.reservationError,
        reservationErrorMessage: state.booking.reservationErrorMessage,
        reservationLoading: state.booking.reservationLoading
    };
};

export default connect(mapStateToProps, actions)(ConfirmBookingScreen);