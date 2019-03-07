import React, { Component } from 'react';
import {
    Dimensions,
    View,
    Text,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import { colors } from '../../utils/Colors';
import { strings } from '../../utils/Strings';

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

class BookingSummary extends Component {
    render() {
        return (
            <View style={styles.topContainer}>
                <View style={styles.topContentContainer}>
                    <View style={styles.itemRow}>
                        <Text style={styles.textAsh}>{strings.confirmBooking.date}</Text>
                        <Text style={styles.textBlack}>{this.props.date}</Text>
                    </View>
                    <View style={styles.itemRow}>
                        <Text style={styles.textAsh}>{strings.confirmBooking.time}</Text>
                        <Text style={styles.textBlack}>{this.props.time}</Text>
                    </View>
                    <View style={styles.itemRow}>
                        <Text style={styles.textAsh}>{strings.confirmBooking.paxCount}</Text>
                        <Text style={styles.textBlack}>{this.props.paxCount}</Text>
                    </View>
                    <View style={styles.itemRow}>
                        <Text style={styles.textAsh}>{strings.confirmBooking.discount}</Text>
                        <Text style={styles.textGreen}>{this.props.discount}%</Text>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = EStyleSheet.create({
    topContainer: {
        flex: 1.8,
        backgroundColor: colors.ash_light
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
    },
    textAsh: {
        fontSize: '13rem',
        color: colors.ash_dark
    },
    textBlack: {
        fontSize: '13rem',
        color: colors.black,
        fontWeight: '500'
    },
    textGreen: {
        fontSize: '13rem',
        color: colors.green_light,
        fontWeight: '500'
    }
});

export { BookingSummary };
