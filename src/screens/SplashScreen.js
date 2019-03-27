import React, { Component } from 'react';
import {
    Dimensions,
    View,
    AsyncStorage
} from 'react-native';
import { connect } from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import { colors } from '../utils/Colors';
import * as actions from '../redux/actions';

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

class SplashScreen extends Component {

    constructor(props) {
        super(props);
        this.state = { hasToken: false };
    }

    componentDidMount() {
        this.setUserData();
    }

    setUserData() {
        const keys = ['id', 'name', 'email', 'mobileNumber', 'imageUrl', 'accessToken'];
        AsyncStorage.multiGet(keys).then((result) => {
            const id = result[0][1];
            const name = result[1][1];
            const email = result[2][1];
            const mobileNumber = result[3][1];
            const imageUrl = result[4][1];
            const accessToken = result[5][1];

            this.props.setId(id);
            this.props.setName(name);
            this.props.setEmail(email);
            this.props.setContactNumber(mobileNumber);
            this.props.setProfilePic(imageUrl);
            this.props.setAccessToken(accessToken);
        }).then(() => {
            this.props.navigation.navigate('App');
        });
    }

    render() {
        return (
            <View style={styles.mainContainer} />
        );
    }
}

const styles = EStyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default connect(null, actions)(SplashScreen);
