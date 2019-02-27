import React, { Component } from 'react';
import {
    Dimensions,
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import {
    Icon,
} from 'native-base';
import EStyleSheet from 'react-native-extended-stylesheet';

import { colors } from '../../utils/Colors';
import { strings } from '../../utils/Strings';

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

class GuestView extends Component {

    render() {
        return (
            <View style={styles.guestView}>
                <View style={styles.guestLeft}>
                    <Icon name={'user-alt'} type={'FontAwesome5'} style={styles.guestIcon} />
                    <Text style={styles.guestText}>{strings.selectBooking.guestNumber}</Text>
                </View>
                <View style={styles.guestRight}>
                    <TouchableOpacity
                        onPress={this.props.onDecrementPressed}
                        disabled={this.props.decrementDisabled}
                    >
                        <Icon name={'minus'} type={'EvilIcons'} style={this.props.decrementDisabled ? styles.disabledIcon : styles.countIcons} />
                    </TouchableOpacity>
                    <Text style={styles.count}>{this.props.numberOfGuests}</Text>
                    <TouchableOpacity
                        onPress={this.props.onIncrementPressed}
                        disabled={this.props.incrementDisabled}
                    >
                        <Icon name={'plus'} type={'EvilIcons'} style={this.props.incrementDisabled ? styles.disabledIcon : styles.countIcons} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = EStyleSheet.create({
    guestView: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: colors.white,
        marginVertical: '8rem',
    },
    guestLeft: {
        flex: 2,
        flexDirection: 'row',
    },
    guestRight: {
        flex: 2.5,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: '30rem'
    },
    guestIcon: {
        fontSize: '12rem',
        color: colors.black,
        alignSelf: 'center',
        paddingHorizontal: '10rem'
    },
    guestText: {
        fontSize: '12rem',
        color: colors.black,
        alignSelf: 'center'
    },
    countIcons: {
        fontSize: '55rem',
        color: colors.black,
    },
    count: {
        paddingHorizontal: '20rem',
        fontSize: '14rem',
        color: colors.ash_dark
    },
    disabledIcon: {
        fontSize: '55rem',
        color: colors.ash_light,
    }
});

export { GuestView };
