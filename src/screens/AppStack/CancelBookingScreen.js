import React, { Component } from 'react';
import {
    Dimensions,
    View,
    Text
} from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import EStyleSheet from 'react-native-extended-stylesheet';
import {
    Button
} from 'native-base';

import { CustomHeader } from '../../components/CustomHeader';
import { BookingSummary } from '../../components/BookingSummary';
import { colors } from '../../utils/Colors';
import * as actions from '../../redux/actions';
import { PROTOCOL, HOST } from '../../api/API';
import { strings } from '../../utils/Strings';

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

class CancelBookingScreen extends Component {

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
                    image={`${PROTOCOL}${HOST}${this.props.selectedBooking.image_url}`}
                    restaurantName={this.props.selectedBooking.name}
                    ratings={this.props.selectedBooking.ratings}
                    address={this.props.selectedBooking.address}
                    onBackPressed={() => this.props.navigation.pop()}
                />
                <View style={{ flex: 6.1 }}>
                    <BookingSummary
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
                                    <Button block style={styles.buttonStyle} >
                                        <Text style={styles.buttonTextStyle}>Cancel my booking</Text>
                                    </Button>
                                </View>
                                :
                                null
                        }
                    </View>
                </View>
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
    };
};

export default connect(mapStateToProps, actions)(CancelBookingScreen);
