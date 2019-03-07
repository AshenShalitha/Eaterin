import React from 'react';
import {
    Dimensions,
    View,
    TouchableOpacity
} from 'react-native';
import {
    Icon
} from 'native-base';
import EStyleSheet from 'react-native-extended-stylesheet';

import { colors } from '../../utils/Colors';

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

const HeaderLeft = () => {
    return (
        <View style={styles.mainContainer}>
            <TouchableOpacity>
                <Icon name={'bell'} type={'SimpleLineIcons'} style={styles.iconStyle} />
            </TouchableOpacity>
        </View>
    );
};

const styles = EStyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white
    },
    iconStyle: {
        fontSize: '22rem',
        color: colors.ash,
        paddingHorizontal: '10rem'
    },
});

export { HeaderLeft };
