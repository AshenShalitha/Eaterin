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

import valueDealBanner from '../../utils/images/valueDealBanner.png';
import { colors } from '../../utils/Colors';

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

const TimeSlotItem = ({
    onItemPressed,
    timeSlot,
    discount,
    isValueDeal
}) => {
    return (
        <TouchableOpacity activeOpacity={0.6} onPress={onItemPressed}>
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
                    <Text style={styles.timeText}>{timeSlot}</Text>
                </View>
                <View style={styles.right}>
                    <Text style={styles.discountText}>{discount}%</Text>
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
        alignSelf: 'center',
    },
    discountText: {
        fontSize: '22rem',
        color: colors.green_light,
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
    }
});

export { TimeSlotItem };