import React, { Component } from 'react';
import {
    Dimensions,
    View,
    Text,
    TouchableOpacity,
    Animated,
    Easing
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import NavigationService from '../../services/NavigationService';

const entireScreenWidth = Dimensions.get('window').width;
const entireScreenHeight = Dimensions.get('window').height;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

class LoginScreen extends Component {
    state = { parentViewX: new Animated.Value(entireScreenHeight) };

    componentDidMount() { this.slideInParentView(); }

    slideInParentView() {
        Animated.spring(this.state.parentViewX,
            {
                toValue: 0,
                friction: 3.9,
                tension: 0.8,
                useNativeDriver: true,
            }
        ).start();
    }

    render() {
        return (
            <Animated.View style={[styles.mainContainer, { transform: [{ translateY: this.state.parentViewX }] }]}>
                <TouchableOpacity onPress={() => NavigationService.navigate('App')}>
                    <Text>Login screen</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('SignupScreen')}>
                    <Text>Signup</Text>
                </TouchableOpacity>
            </Animated.View>
        );
    }
}

const styles = EStyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#ac3657',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default LoginScreen;