import React, { Component } from 'react';
import {
    Dimensions,
    View,
    Text
} from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Icon } from 'native-base';

import { CustomHeader } from '../../components/CustomHeader';
import { BookingSummary } from '../../components/BookingSummary';
import { RefNoView } from '../../components/RefNoView';
import { colors } from '../../utils/Colors';
import * as actions from '../../redux/actions';
import { PROTOCOL, HOST } from '../../api/API';
import { strings } from '../../utils/Strings';

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

class FinishBookingScreen extends Component {
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
                <View style={{ flex: 6.1 }}>
                    <BookingSummary
                        date={moment(new Date(this.props.selectedDate), 'MM/DD/YYYY', true).format('DD MMM YYYY')}
                        time={this.props.selectedTimeSlotObj.time}
                        paxCount={this.props.numberOfGuests}
                        discount={this.props.selectedTimeSlotObj.discount}
                    />
                    {
                        this.props.reservationError ?
                            <View style={styles.errorContainer}>
                                <Icon name={'ios-close-circle-outline'} type={'Ionicons'} style={styles.iconStyle} />
                                <Text style={styles.errorText}>{strings.errors.reservationError}</Text>
                            </View>
                            :
                            <RefNoView
                                refNo={'3197187'}
                                onPress={() => this.props.navigation.popToTop()}
                            />
                    }
                </View>
            </View >
        );
    }
}

const styles = EStyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.white
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
    }
});

const mapStateToProps = state => {
    return {
        numberOfGuests: state.booking.numberOfGuests,
        selectedRestaurant: state.booking.selectedRestaurant,
        selectedTimeSlotObj: state.booking.selectedTimeSlotObj,
        selectedDate: state.booking.selectedDate,
        reservationError: state.booking.reservationError,
    };
};

export default connect(mapStateToProps, actions)(FinishBookingScreen);
