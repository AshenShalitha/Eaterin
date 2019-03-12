import React from 'react';
import { createStackNavigator } from 'react-navigation';
import SelectBookingScreen from './SelectBookingScreen';
import ConfirmBookingScreen from './ConfirmBookingScreen';
import FinishBookingScreen from './FinishBookingScreen';
import BottomTabNavigator from './BottomTabNavigator/BottomTabNavigator';

export const AppStackNavigator = createStackNavigator(
    {
        BottomTabNavigator: {
            screen: BottomTabNavigator,
            headerMode: 'none',
            header: null,
            navigationOptions: {
                header: null
            }
        },
        SelectBookingScreen: {
            screen: SelectBookingScreen,
            headerMode: 'none',
            header: null,
            navigationOptions: {
                header: null
            }
        },
        ConfirmBookingScreen: {
            screen: ConfirmBookingScreen,
            headerMode: 'none',
            header: null,
            navigationOptions: {
                header: null
            }
        },
        FinishBookingScreen: {
            screen: FinishBookingScreen,
            headerMode: 'none',
            header: null,
            navigationOptions: {
                header: null
            }
        }
    },
    {
        initialRouteKey: 'SelectBookingScreen'
    }
)