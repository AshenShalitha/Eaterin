import React from 'react';
import {
    Dimensions,
    View,
    Text,
    TouchableOpacity,
    Linking
} from 'react-native';
import {
    Button,
    Icon
} from 'native-base';
import EStyleSheet from 'react-native-extended-stylesheet';

import { colors } from '../../utils/Colors';
import { strings } from '../../utils/Strings';
import { TERMS } from '../../api/API';

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

const onTermsPressed = () => {
    Linking.canOpenURL(TERMS).then(supported => {
        if (supported) {
            Linking.openURL(TERMS);
        } else {
            console.log("Don't know how to open URI: " + this.props.url);
        }
    });
};

const RefNoView = ({
    refNo,
    onPress
}) => {
    return (
        <View style={styles.bottomContainer}>
            <View style={styles.topContainer}>
                <View>
                    <Icon name={'md-checkmark-circle-outline'} type={'Ionicons'} style={styles.iconStyle} />
                    <Text style={styles.textBold}>{strings.finishBooking.thanksYou}</Text>
                    <Text style={styles.textNormal}>{strings.finishBooking.text1}</Text>
                </View>
                <View style={styles.refNoContainer}>
                    <Text style={styles.normalLarge}>{strings.finishBooking.refNo}</Text>
                    <Text style={styles.refNoText}>{refNo}</Text>
                </View>
                <View style={{ paddingVertical: 0 }}>
                    <Text style={styles.textSmall}>{strings.finishBooking.text2}</Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.textSmall}>  Read our </Text>
                    <TouchableOpacity onPress={onTermsPressed}>
                        <Text style={[styles.textSmall, { color: '#5887d3' }]}>terms & conditions</Text>
                    </TouchableOpacity>
                    <Text style={styles.textSmall}> here.</Text>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <Button block style={styles.buttonStyle} onPress={onPress}>
                    <Text style={styles.buttonTextStyle}>{strings.finishBooking.buttonText}</Text>
                </Button>
            </View>
        </View>
    );
};

const styles = EStyleSheet.create({
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
        alignSelf: 'center',
        flexDirection: 'row',
        paddingRight: '10rem',
    },
    refNoText: {
        fontSize: '22rem',
        color: colors.black,
        fontWeight: '500',
    },
    textContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: '0rem'
    },
    textSmall: {
        fontSize: '11rem',
        color: colors.ash_dark,
        alignSelf: 'center',
        textAlign: 'center'
    }
});

export { RefNoView };
