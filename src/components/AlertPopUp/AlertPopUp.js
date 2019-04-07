import React from 'react';
import {
    Dimensions,
    View,
    Text,
} from 'react-native';
import {
    Icon,
    Button
} from 'native-base';
import Modal from 'react-native-modal';
import EStyleSheet from 'react-native-extended-stylesheet';

import { colors } from '../../utils/Colors';

const entireScreenWidth = Dimensions.get('window').width;
const entireScreenHeight = Dimensions.get('window').height;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

const AlertPopUp = ({
    isVisible,
    onBackdropPress,
    onBackButtonPress,
    title,
    text,
    buttonCount,
    buttonText,
    positiveButtonText,
    negativeButtonText,
    onPress,
    onPositivePress,
    onNegativePress,
    iconName,
    iconType
}) => {
    return (
        <Modal
            isVisible={isVisible}
            backdropColor='black'
            useNativeDriver
            onBackdropPress={onBackdropPress}
            onBackButtonPress={onBackButtonPress}
            animationIn={'bounceInUp'}
            animationOut={'bounceOutDown'}
            animationInTiming={900}
            animationOutTiming={900}
        >
            <View style={styles.modal}>
                <View style={styles.modalUpper}>
                    <Icon name={iconName} type={iconType} style={styles.closeIcon} />
                </View>
                <View style={styles.modalMiddle}>
                    <Text style={styles.modalTitleStyle}>{title}</Text>
                    <Text style={styles.modalTextStyle}>{text}</Text>
                </View>
                {
                    buttonCount === 1 ?
                        <View style={styles.modalBottom}>
                            <Button block style={styles.buttonStyle} onPress={onPress}>
                                <Text style={styles.buttonTextStyle}>{buttonText}</Text>
                            </Button>
                        </View>
                        :
                        <View style={styles.modalBottom}>
                            <Button block style={styles.positiveButtonStyle} onPress={onPositivePress}>
                                <Text style={styles.buttonTextStyle}>{positiveButtonText}</Text>
                            </Button>
                            <Button block style={styles.negativeButtonStyle} onPress={onNegativePress}>
                                <Text style={styles.buttonTextStyle}>{negativeButtonText}</Text>
                            </Button>
                        </View>
                }
            </View>
        </Modal>
    );
}

const styles = EStyleSheet.create({
    modal: {
        height: entireScreenHeight * 0.28,
        width: entireScreenWidth * 0.8,
        backgroundColor: colors.white,
        alignSelf: 'center',
        borderRadius: '10rem'
    },
    modalUpper: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: colors.green_light,
        borderTopLeftRadius: '10rem',
        borderTopRightRadius: '10rem'
    },
    modalMiddle: {
        flex: 0.8,
        justifyContent: 'space-around'
    },
    modalBottom: {
        flex: 0.8,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderBottomLeftRadius: '10rem',
        borderBottomRightRadius: '10rem'
    },
    modalTitleStyle: {
        fontSize: '20rem',
        color: colors.black,
        alignSelf: 'center',
        fontWeight: '500'
    },
    modalTextStyle: {
        fontSize: '13rem',
        color: colors.ash_dark,
        alignSelf: 'center'
    },
    buttonStyle: {
        backgroundColor: colors.green_light,
        height: '32rem',
        width: '120rem',
        alignSelf: 'center'
    },
    positiveButtonStyle: {
        backgroundColor: colors.green_light,
        height: '32rem',
        width: '100rem',
        alignSelf: 'center'
    },
    negativeButtonStyle: {
        backgroundColor: colors.red,
        height: '32rem',
        width: '100rem',
        alignSelf: 'center'
    },
    buttonTextStyle: {
        color: colors.white,
        fontWeight: '300',
        fontSize: '13rem',
        alignSelf: 'center'
    },
    closeIcon: {
        color: colors.white,
        fontSize: '40rem',
        alignSelf: 'center'
    }
});


export { AlertPopUp };
