import React, { Component } from 'react';
import {
    Dimensions,
    View,
    TouchableOpacity
} from 'react-native';
import {
    Icon
} from 'native-base';
import EStyleSheet from 'react-native-extended-stylesheet';
import { connect } from 'react-redux';

import { colors } from '../../utils/Colors';
import * as actions from '../../redux/actions';

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

class HeaderRight extends Component {

    onPress() {
        if (this.props.isSearchVisible) {
            this.props.onSearchPressed(false);
        } else {
            this.props.onSearchPressed(true);
        }
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <TouchableOpacity onPress={() => this.onPress()}>
                    <Icon name={'search1'} type={'AntDesign'} style={styles.iconStyle} />
                </TouchableOpacity>
            </View>
        );
    }
}

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

const mapStateToProps = state => {
    return {
        isSearchVisible: state.booking.isSearchVisible
    };
};

export default connect(mapStateToProps, actions)(HeaderRight);
