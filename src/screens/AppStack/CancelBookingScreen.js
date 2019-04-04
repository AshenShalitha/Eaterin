import React, { Component } from 'react';
import {
    Dimensions,
    View,
    Text,
    AsyncStorage,
    NetInfo
} from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import EStyleSheet from 'react-native-extended-stylesheet';
import {
    Button
} from 'native-base';

import { CustomHeader } from '../../components/CustomHeader';
import { CancelBookingSummary } from '../../components/CancelBookingSummary';
import { AlertPopUp } from '../../components/AlertPopUp';
import { colors } from '../../utils/Colors';
import * as actions from '../../redux/actions';
import { strings } from '../../utils/Strings';

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

class CancelBookingScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            noInternet: false
        };
        this.isConnected = true;
        NetInfo.isConnected.fetch().then(isConnected => {
            this.isConnected = isConnected;
        });
    }

    componentDidMount() {
        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
    }

    componentDidUpdate() {
        if (this.props.bookingDeleteSuccess) {
            this.props.navigation.pop();
        }
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

    onCancelPressed() {
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
        const { reservation_id: reservationId, time_slot_id: timeSlotId } = this.props.selectedBooking;
        const { id } = this.props;
        AsyncStorage.getItem('accessToken').then(accessToken => {
            this.props.deleteBooking(reservationId, id, timeSlotId, accessToken);
        });
        this.closeModal();
    }

    checkDate() {
        const now = moment().format('YYYY-MM-DD HH:mm');
        const { date, time } = this.props.selectedBooking;
        if (moment(now).isBefore(`${date} ${time}`)) {
            return true;
        }
        return false;
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <CustomHeader
                    image={this.props.selectedBooking.image_url}
                    restaurantName={this.props.selectedBooking.name}
                    ratings={this.props.selectedBooking.ratings}
                    address={this.props.selectedBooking.address}
                    onBackPressed={() => this.props.navigation.pop()}
                />
                <View style={{ flex: 6.1 }}>
                    <CancelBookingSummary
                        date={moment(new Date(this.props.selectedBooking.date), 'MM/DD/YYYY', true).format('DD MMM YYYY')}
                        time={this.props.selectedBooking.time}
                        paxCount={this.props.selectedBooking.guest_number}
                        refNo={this.props.selectedBooking.reference_number}
                        discount={this.props.selectedBooking.discount}
                    />
                    <View style={{ flex: 2.8, backgroundColor: colors.ash_light }}>
                        {
                            this.checkDate() ?
                                <View style={styles.buttonContainer}>
                                    <Button block style={styles.buttonStyle} onPress={() => this.onCancelPressed()}>
                                        <Text style={styles.buttonTextStyle}>Cancel my booking</Text>
                                    </Button>
                                </View>
                                :
                                null
                        }
                    </View>
                </View>
                <AlertPopUp
                    isVisible={this.state.modalVisible}
                    onBackdropPress={() => this.closeModal()}
                    onBackButtonPress={() => this.closeModal()}
                    title={'Confirm'}
                    text={'Press Ok to delete the reservation'}
                    positiveButtonText={'Ok'}
                    negativeButtonText={'Cancel'}
                    buttonCount={2}
                    iconName={'infocirlceo'}
                    iconType={'AntDesign'}
                    onPositivePress={() => this.onOkPressed()}
                    onNegativePress={() => this.closeModal()}
                />
                <AlertPopUp
                    isVisible={this.state.noInternet}
                    onBackdropPress={() => this.noInternetPopupCancelled()}
                    onBackButtonPress={() => this.noInternetPopupCancelled()}
                    title={'Alert'}
                    text={'No internet connection!'}
                    buttonText={'Ok'}
                    buttonCount={1}
                    onPress={() => this.noInternetPopupCancelled()}
                    iconName={'alert-circle'}
                    iconType={'Feather'}
                />
            </View >
        );
    }
}

const styles = EStyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.ash_light
    },
    buttonContainer: {
        height: '75rem',
        width: entireScreenWidth,
        backgroundColor: colors.white,
        paddingHorizontal: '20rem',
        justifyContent: 'center'
    },
    errorContainer: {
        flex: 3,
        justifyContent: 'center'
    },
    iconStyle: {
        fontSize: '50rem',
        alignSelf: 'center'
    },
    errorText: {
        fontSize: '13rem',
        color: colors.ash_dark,
        alignSelf: 'center',
        textAlign: 'center',
        paddingVertical: '10rem'
    },
    buttonStyle: {
        backgroundColor: colors.red_dark,
        height: '35rem',
    },
    buttonTextStyle: {
        color: colors.ash_light,
        fontWeight: '300',
        fontSize: '14rem',
        alignSelf: 'center'
    },
});

const mapStateToProps = state => {
    return {
        selectedBooking: state.booking.selectedBooking,
        bookingDeleteSuccess: state.booking.bookingDeleteSuccess,
        id: state.profile.id,
    };
};

export default connect(mapStateToProps, actions)(CancelBookingScreen);
