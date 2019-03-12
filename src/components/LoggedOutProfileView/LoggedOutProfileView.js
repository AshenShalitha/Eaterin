import React from 'react';
import {
    Dimensions,
    View,
    Text,
} from 'react-native';
import {
    Button,
    Icon
} from 'native-base';
import EStyleSheet from 'react-native-extended-stylesheet';

import { colors } from '../../utils/Colors';
import { strings } from '../../utils/Strings';

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

const LoggedOutProfileView = ({
    onPress
}) => {
    return (
        <View style={styles.bottomContainer}>
            <View style={styles.iconContainer}>
                <Icon name={'account-alert'} type={'MaterialCommunityIcons'} style={styles.userAlertIcon} />
            </View>
            <Text style={styles.plainText}>{strings.profile.loggedOut.text}</Text>
            <Button transparent style={styles.loginButton} onPress={onPress} >
                <Text style={styles.loginBtnText}>{strings.profile.loggedOut.btn}</Text>
            </Button>
        </View>
    );
};

const styles = EStyleSheet.create({
    bottomContainer: {
        flex: 1,
        backgroundColor: colors.white,
        alignSelf: 'stretch',
        justifyContent: 'center',
        paddingTop: '50rem'
    },
    plainText: {
        fontSize: '13rem',
        color: colors.ash_dark,
        textAlign: 'center'
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        // borderWidth: '1rem',
        // borderColor: colors.ash_light,
        paddingVertical: '20rem'
    },
    userAlertIcon: {
        fontSize: '60rem',
        color: colors.ash
    },
    loginButton: {
        alignSelf: 'center'
    },
    loginBtnText: {
        fontSize: '13rem',
        color: colors.green_light
    }
});

export { LoggedOutProfileView };

