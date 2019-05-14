import React from 'react';
import {
    Dimensions,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import {
    Icon,
} from 'native-base';
import EStyleSheet from 'react-native-extended-stylesheet';

import { colors } from '../../utils/Colors';

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

const SettingsButton = ({
    onPress,
    iconName,
    iconType,
    text
}) => {
    return (
        <View style={styles.expandableCard}>
            <TouchableOpacity style={styles.lableContainer} onPress={onPress}>
                <View style={styles.left}>
                    <Icon name={iconName} type={iconType} style={styles.iconStyle} />
                    <Text style={styles.labelText}>{text}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = EStyleSheet.create({
    expandableCard: {
        width: entireScreenWidth * 0.9,
        height: '50rem',
        borderRadius: '2rem',
        alignSelf: 'center',
        marginTop: '15rem',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 3, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        backgroundColor: colors.white
    },
    lableContainer: {
        flex: 1,
        flexDirection: 'row',
        marginHorizontal: '15rem',
        justifyContent: 'space-between',
    },
    left: {
        flex: 3,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    iconStyle: {
        fontSize: '20rem',
        color: colors.ash_dark
    },
    labelText: {
        fontSize: '14rem',
        color: colors.ash_dark,
        paddingHorizontal: '10rem'
    },
});


export { SettingsButton };
