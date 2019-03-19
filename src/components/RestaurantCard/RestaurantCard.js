import React from 'react';
import {
    Dimensions,
    View,
    Text,
    ImageBackground,
    TouchableOpacity
} from 'react-native';
import {
    Card,
    Icon
} from 'native-base';
import EStyleSheet from 'react-native-extended-stylesheet';
import greenTab from '../../utils/images/greenTab1.png';
import { colors } from '../../utils/Colors';

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

const cropAddress = address => {
    if (address.length > 42) {
        return `${address.slice(0, 42)}...`;
    }
    return address;
};

const RestaurantCard = ({
    onPress,
    image,
    maxDiscount,
    restaurantName,
    address,
    ratings
}) => {
    return (
        <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
            <Card style={styles.cardStyle}>
                <ImageBackground
                    style={styles.imageBackgroundStyle}
                    source={{ uri: image }}
                    resizeMode={'cover'}
                >
                    <ImageBackground
                        style={styles.greenTabStyle}
                        source={greenTab}
                    >
                        <Text style={styles.textLarge}>Up to {maxDiscount} % off</Text>
                        <Text style={styles.textSmall}>on your reservation</Text>
                    </ImageBackground>
                </ImageBackground>
                <View style={styles.footerStyle}>
                    <View style={styles.footerItem}>
                        <Text style={styles.titleStyle}>{restaurantName}</Text>
                    </View>
                    <View style={styles.footerItem}>
                        <View style={styles.footerLeft}>
                            <Icon name={'location-on'} type={'MaterialIcons'} style={styles.iconStyle} />
                            <Text style={styles.addressText}>{cropAddress(address)}</Text>
                        </View>
                        <View style={styles.footerRight}>
                            <View style={styles.ratingsView}>
                                <Text style={styles.ratingsText}>{ratings}</Text>
                                <Icon name={'star'} type={'AntDesign'} style={styles.starIcon} />
                            </View>
                        </View>
                    </View>
                </View>
            </Card>
        </TouchableOpacity>
    );
};

const styles = EStyleSheet.create({
    cardStyle: {
        height: '200rem'
    },
    imageBackgroundStyle: {
        flex: 2,
        width: entireScreenWidth - EStyleSheet.value('20rem'),
    },
    footerStyle: {
        flex: 0.8,
        paddingHorizontal: '15rem'
    },
    footerItem: {
        flex: 1,
        flexDirection: 'row',
    },
    titleStyle: {
        fontSize: '18rem',
        fontWeight: '600',
        color: colors.black,
        alignSelf: 'center'
    },
    footerLeft: {
        flex: 5,
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingRight: '10rem'
    },
    footerRight: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    iconStyle: {
        fontSize: '12rem',
        color: colors.black,
        paddingRight: '3rem'
    },
    addressText: {
        fontSize: '11rem',
        color: colors.ash
    },
    ratingsView: {
        width: '40rem',
        height: '20rem',
        borderRadius: '10rem',
        justifyContent: 'space-around',
        paddingHorizontal: '5rem',
        borderColor: colors.ash_light,
        borderWidth: '1rem',
        alignSelf: 'center',
        flexDirection: 'row'
    },
    ratingsText: {
        fontSize: '10rem',
        color: colors.black,
        textAlign: 'center',
        alignSelf: 'center'
    },
    starIcon: {
        fontSize: '9rem',
        color: colors.orange,
        alignSelf: 'center'
    },
    greenTabStyle: {
        width: '150rem',
        height: '35rem',
        alignSelf: 'flex-end',
        justifyContent: 'center'
    },
    textLarge: {
        fontSize: '14rem',
        color: colors.white,
        alignSelf: 'flex-end',
        paddingHorizontal: '25rem'
    },
    textSmall: {
        fontSize: '9rem',
        color: colors.black,
        alignSelf: 'flex-end',
        paddingHorizontal: '25rem',
        paddingBottom: '5rem',
        lineHeight: '10rem'
    }
});

export { RestaurantCard };
