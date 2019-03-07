import React from 'react';
import {
    Dimensions,
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import {
    Icon,
    Card
} from 'native-base';
import EStyleSheet from 'react-native-extended-stylesheet';

import { colors } from '../../utils/Colors';

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

const TimeSlotItem = ({
    onItemPressed,
    timeSlot,
    discount
}) => {
    return (
        <TouchableOpacity activeOpacity={0.6} onPress={onItemPressed}>
            <Card style={styles.listItem}>
                <View style={styles.left}>
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
        justifyContent: 'center',
        marginLeft: '20rem',
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
    discountText: {
        fontSize: '22rem',
        color: colors.green_light,
        fontWeight: '500'
    },
    arrowIcon: {
        fontSize: '14rem',
        color: colors.ash
    }
});

export { TimeSlotItem };