import React, { Component } from 'react';
import {
    Dimensions,
    View,
} from 'react-native';
import {
    Icon,
    Card
} from 'native-base';
import EStyleSheet from 'react-native-extended-stylesheet';

import { colors } from '../../utils/Colors';
import { CustomHeader } from '../../components/CustomHeader';
import { DatesGroup } from '../../components/DatesGroup';

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

class SelectBookingScreen extends Component {

    render() {
        return (
            <View style={styles.mainContainer}>
                <CustomHeader
                    image={'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80'}
                    restaurantName={'The Sizzle'}
                    ratings={'4.5'}
                    address={'Kollupitiya > 24, Deal Place, Kollupitiya'}
                    onBackPressed={() => this.props.navigation.pop()}
                />
                <View style={styles.dateContainer}>
                    <DatesGroup />
                </View>
                <View style={styles.guestsContainer}>
                    <View style={styles.guestView}>

                    </View>
                </View>
                <View style={styles.timeSlotContainer}>
                    <View>

                    </View>
                    <View>

                    </View>
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
    guestView: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: colors.white,
        marginVertical: '8rem',
        alignItems: 'center'
    }
});

export default SelectBookingScreen;
