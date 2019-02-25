import React, { Component } from 'react';
import {
    Dimensions,
    View,
    ImageBackground,
    TouchableOpacity,
    Text
} from 'react-native';
import {
    Icon,
    Card
} from 'native-base';
import EStyleSheet from 'react-native-extended-stylesheet';

import { colors } from '../../utils/Colors';

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

class CustomHeader extends Component {
    render() {
        return (
            <ImageBackground
                style={styles.imageBackgroundStyle}
                source={{ uri: this.props.image }}
                resizeMode={'cover'}
            >
                <TouchableOpacity
                    style={styles.iconContainer}
                    activeOpacity={0.7}
                    onPress={this.props.onBackPressed}
                >
                    <Icon name={'ios-arrow-round-back'} type={'Ionicons'} style={styles.backIcon} />
                </TouchableOpacity>
                <Card style={styles.titleCard}>
                    <View style={styles.cardItem}>
                        <View style={styles.left}>
                            <Text style={styles.titleStyle}>{this.props.restaurantName}</Text>
                        </View>
                        <View style={styles.right}>
                            <View style={styles.ratingsView}>
                                <Text style={styles.ratingsText}>{this.props.ratings}</Text>
                                <Icon name={'star'} type={'AntDesign'} style={styles.starIcon} />
                            </View>
                        </View>
                    </View>
                    <View style={styles.cardItem}>
                        <Icon name={'location-on'} type={'MaterialIcons'} style={styles.iconStyle} />
                        <Text style={styles.addressText}>{this.props.address}</Text>
                    </View>
                </Card>
            </ImageBackground>
        );
    }
}

const styles = EStyleSheet.create({
    imageBackgroundStyle: {
        flex: 1.8,
        paddingLeft: '10rem',
        '@media ios': {
            paddingTop: '32rem',
        },
        '@media android': {
            paddingTop: '10rem',
        }
    },
    backIcon: {
        color: colors.ash,
        fontSize: '30rem',
        alignSelf: 'center'
    },
    iconContainer: {
        height: '26rem',
        width: '26rem',
        borderRadius: '13rem',
        backgroundColor: colors.white,
        justifyContent: 'center',
    },
    titleCard: {
        height: '60rem',
        width: entireScreenWidth * 0.95,
        alignSelf: 'center',
        backgroundColor: colors.white,
        position: 'absolute',
        bottom: -30,
        shadowColor: colors.ash,
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.1,
        shadowRadius: '10rem',
        elevation: 5,
        paddingHorizontal: '10rem',
        paddingVertical: '0rem'
    },
    cardItem: {
        flex: 1,
        flexDirection: 'row',
    },
    titleStyle: {
        fontSize: '18rem',
        fontWeight: '600',
        color: colors.black,
    },
    left: {
        flex: 5,
        justifyContent: 'center',
    },
    right: {
        flex: 1,
        justifyContent: 'center',
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
});

export { CustomHeader };