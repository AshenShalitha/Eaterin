import React, { Component } from 'react';
import {
    Dimensions,
    ScrollView,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import RadioGroup from 'react-native-custom-radio-group';
import moment from 'moment';

import { colors } from '../../utils/Colors';

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

class DatesGroup extends Component {

    generateDateArray() {
        const dates = [];
        let item = {};
        for (let i = 0; i < 7; i++) {
            item.label = moment().add(i, 'd').format('DD MMM');
            item.value = moment().add(i, 'd').format('DD-MM-YYY');
            dates.push(item);
            item = {};
        }
        return dates;
    }

    render() {
        return (
            <ScrollView showsHorizontalScrollIndicator={false} horizontal contentContainerStyle={{ alignItems: 'flex-end' }}>
                <RadioGroup
                    radioGroupList={this.generateDateArray()}
                    containerStyle={styles.containerStyle}
                    buttonContainerStyle={styles.radioButton}
                    buttonContainerActiveStyle={{ backgroundColor: colors.green_light }}
                    buttonContainerInactiveStyle={{ backgroundColor: colors.ash_lighter }}
                    buttonTextActiveStyle={{ color: colors.white }}
                    buttonTextInactiveStyle={{ color: colors.black }}
                    buttonTextStyle={{ fontWeight: '100', fontSize: EStyleSheet.value('14rem') }}
                    initialValue={moment().format('DD-MM-YYY')}
                    onChange={this.props.onChange}
                />
            </ScrollView>
        );
    }
}

const styles = EStyleSheet.create({
    timeSlotContainer: {
        flex: 4,
        backgroundColor: colors.white
    },
    radioButton: {
        height: '26rem',
        width: '70rem',
        borderRadius: '13rem',
        borderWidth: '0rem',
        marginHorizontal: '3rem'
    },
    containerStyle: {
        marginBottom: '12rem',
        paddingHorizontal: '3rem'
    },
});

export { DatesGroup };