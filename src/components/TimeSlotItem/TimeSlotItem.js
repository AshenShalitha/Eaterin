import React from 'react';
import {
    Dimensions,
    View,
    Text,
    TouchableOpacity,
    Image
} from 'react-native';
import {
    Icon,
    Card
} from 'native-base';
import EStyleSheet from 'react-native-extended-stylesheet';
import moment from 'moment';

import valueDealBanner from '../../utils/images/valueDealBanner.png';
import { colors } from '../../utils/Colors';

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

const setPaxText = (paxCount) => {
    if (paxCount <= 4) {
        return `${paxCount} pax remaining`;
    }
    return null;
};

const TimeSlotItem = ({
    onItemPressed,
    timeSlot,
    discount,
    isValueDeal,
    paxCount,
    disabled,
}) => {
    return (
        <TouchableOpacity activeOpacity={0.6} onPress={onItemPressed} disabled={disabled}>
            <Card style={styles.listItem}>
                <View style={styles.left}>
                    {
                        isValueDeal === 1 ?
                            <Image
                                source={valueDealBanner}
                                style={styles.bannerStyle}
                            />
                            :
                            <View style={styles.emptyView} />
                    }
                    <View style={styles.textContainer}>
                        <Text style={disabled ? styles.timeTextDisabled : styles.timeText}>{moment(timeSlot, 'HH:mm').format('LT')}</Text>
                        <Text style={disabled ? styles.paxCountTextDisabled : styles.paxCountText}>{setPaxText(paxCount)}</Text>
                    </View>
                </View>
                <View style={styles.right}>
                    <Text style={disabled ? styles.discountTextDisabled : styles.discountText}>{discount}%</Text>
                    <Icon name={'arrow-right'} type={'SimpleLineIcons'} style={styles.arrowIcon} />
                </View>
            </Card>
        </TouchableOpacity>
    );
};

const styles = EStyleSheet.create({
    listItem: {
        height: '60rem',
        width: entireScreenWidth * 0.95,
        alignSelf: 'center',
        flexDirection: 'row'
    },
    left: {
        flex: 2.5,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: '0rem',
    },
    right: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    timeText: {
        fontSize: '16rem',
        color: colors.black,
        alignSelf: 'flex-start',
    },
    timeTextDisabled: {
        fontSize: '16rem',
        color: colors.ash_light,
        alignSelf: 'flex-start',
    },
    discountText: {
        fontSize: '22rem',
        color: colors.green_light,
        fontWeight: '500'
    },
    discountTextDisabled: {
        fontSize: '22rem',
        color: colors.ash_light,
        fontWeight: '500'
    },
    arrowIcon: {
        fontSize: '14rem',
        color: colors.ash
    },
    bannerStyle: {
        height: '35rem',
        width: '35rem',
        alignSelf: 'flex-start'
    },
    emptyView: {
        height: '35rem',
        width: '35rem',
        alignSelf: 'flex-start'
    },
    textContainer: {
        flex: 1,
        paddingLeft: '0rem'
    },
    paxCountText: {
        fontSize: '11rem',
        color: colors.ash_dark
    },
    paxCountTextDisabled: {
        fontSize: '11rem',
        color: colors.ash_light
    },
});

export { TimeSlotItem };