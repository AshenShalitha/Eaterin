import React, { Component } from 'react';
import {
    Dimensions,
    View,
    ScrollView,
    Text,
} from 'react-native';
import {
    Button,
    Icon
} from 'native-base';
import { connect } from 'react-redux';
import moment from 'moment';
import EStyleSheet from 'react-native-extended-stylesheet';

import { CustomHeader } from '../../components/CustomHeader';
import { BookingSummary } from '../../components/BookingSummary';
import { colors } from '../../utils/Colors';
import * as actions from '../../redux/actions';
import { PROTOCOL, HOST } from '../../api/API';

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
                        time={this.props.selectedTimeSlotObj.timeSlot}
                        paxCount={this.props.numberOfGuests}
                        discount={this.props.selectedTimeSlotObj.discount}
                    />
                    <View style={styles.bottomContainer}>
                        <View style={styles.topContainer}>
                            <View>
                                <Icon name={'md-checkmark-circle-outline'} type={'Ionicons'} style={styles.iconStyle} />
                                <Text style={styles.textBold}>Thank you</Text>
                                <Text style={styles.textNormal}>Your reservation has been confirmed.</Text>
                            </View>
                            <View style={styles.refNoContainer}>
                                <Text style={styles.normalLarge}>Ref No</Text>
                                <Text style={styles.refNoText}>3197187</Text>
                            </View>
                            <View>
                                <Text style={styles.textNormal}>Please be at restaurant on time to grab above mentioned discount.
                                    You will have 15 mins grace period.
                                </Text>
                            </View>
                        </View>
                        <View style={styles.buttonContainer}>
                            <Button block style={styles.buttonStyle} >
                                <Text style={styles.buttonTextStyle}>Let's go</Text>
                            </Button>
                        </View>
                    </View>
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
    bottomContainer: {
        flex: 3
    },
    topContainer: {
        flex: 4.3,
        paddingHorizontal: '25rem',
        justifyContent: 'space-around',
    },
    buttonContainer: {
        flex: 1.3,
        justifyContent: 'center',
        paddingHorizontal: '25rem'
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
    iconStyle: {
        fontSize: '70rem',
        alignSelf: 'center'
    },
    textBold: {
        fontSize: '16rem',
        alignSelf: 'center',
        fontWeight: '500',
        paddingTop: '5rem',
        color: colors.black
    },
    textNormal: {
        fontSize: '13rem',
        color: colors.ash_dark,
        alignSelf: 'center',
        textAlign: 'center'
    },
    refNoContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
    },
    normalLarge: {
        fontSize: '15rem',
        color: colors.ash_dark,
        textAlignVertical: 'center',
        paddingRight: '10rem',
    },
    refNoText: {
        fontSize: '22rem',
        color: colors.black,
        fontWeight: '500'
    }
});

const mapStateToProps = state => {
    return {
        numberOfGuests: state.booking.numberOfGuests,
        selectedRestaurant: state.booking.selectedRestaurant,
        selectedTimeSlotObj: state.booking.selectedTimeSlotObj,
        selectedDate: state.booking.selectedDate
    };
};

export default connect(mapStateToProps, actions)(FinishBookingScreen);