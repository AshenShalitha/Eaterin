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
                        activeOpacity={0.5}
                        onPress={this.props.onDecrementPressed}
                        disabled={this.props.decrementDisabled}
                        style={this.props.decrementDisabled ? styles.iconContainerDisabled : styles.iconContainer}
                    >
                        <Icon name={'minus'} type={'AntDesign'} style={this.props.decrementDisabled ? styles.disabledIcon : styles.countIcons} />
                    </TouchableOpacity>
                    <Text style={styles.count}>{this.props.numberOfGuests}</Text>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={this.props.onIncrementPressed}
                        disabled={this.props.incrementDisabled}
                        style={this.props.incrementDisabled ? styles.iconContainerDisabled : styles.iconContainer}
                    >
                        <Icon name={'plus'} type={'AntDesign'} style={this.props.incrementDisabled ? styles.disabledIcon : styles.countIcons} />
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
        color: colors.ash_dark,
        alignSelf: 'center'
    },
    iconContainer: {
        height: '36rem',
        width: '36rem',
        borderRadius: '18rem',
        borderWidth: '1rem',
        borderColor: colors.black,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconContainerDisabled: {
        height: '36rem',
        width: '36rem',
        borderRadius: '18rem',
        borderWidth: '1rem',
        borderColor: colors.ash_light,
        justifyContent: 'center',
        alignItems: 'center'
    },
    countIcons: {
        fontSize: '18rem',
        color: colors.black,
    },
    disabledIcon: {
        fontSize: '18rem',
        color: colors.ash_light,
        fontWeight: '100'
    },
    count: {
        paddingHorizontal: '32rem',
        fontSize: '14rem',
        color: colors.ash_dark
    },

});

export { GuestView };
