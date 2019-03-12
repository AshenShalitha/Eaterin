import React, { Component } from 'react';
import {
    Dimensions,
    View,
    AsyncStorage
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { colors } from '../utils/Colors';

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

class SplashScreen extends Component {

    constructor(props) {
        super(props);
        this.state = { hasToken: false };
    }

    componentDidMount() {
        this.bootstrapAsync();
    }

    bootstrapAsync = () => {
        AsyncStorage.getItem('accessToken').then(accessToken => {
            this.setState({ hasToken: accessToken !== null });
        }).then(() => {
            if (this.state.hasToken) {
                this.props.navigation.navigate('App');
            } else {
                this.props.navigation.navigate('Auth');
            }
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

export default SplashScreen;
