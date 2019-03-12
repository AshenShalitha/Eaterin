import React from 'react';
import { createStackNavigator } from 'react-navigation';
import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';

export const AuthStackNavigator = createStackNavigator(
    {
        LoginScreen: {
            screen: LoginScreen,
            headerMode: 'none',
            header: null,
            navigationOptions: {
                header: null
            }
        },
        SignupScreen: {
            screen: SignupScreen,
            headerMode: 'none',
            header: null,
            navigationOptions: {
                header: null
            }
        }
    },
    {
        initialRouteName: 'LoginScreen'
    }
);