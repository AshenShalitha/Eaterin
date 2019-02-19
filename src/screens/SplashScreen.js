import React, { Component } from 'react';
import {
    Dimensions,
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

class SplashScreen extends Component {

    constructor(props) {
        super(props);
        this._bootstrapAsync();
    }

    _bootstrapAsync = () => {
        setTimeout(() => {
            this.props.navigation.navigate('Auth');
        }, 2000);
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <Text>Splash screen</Text>
            </View>
        );
    }
}

const styles = EStyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#542682',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default SplashScreen;