import React from 'react';
import { Dimensions } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Icon } from 'native-base';

import { RestaurantStack } from './RestaurantsStack/RestaurantStack';
import { BookingsStack } from './BookingsStack/BookingsStack';
import { ProfileStack } from './ProfileStack/ProfileStack';
import { strings } from '../../../utils/Strings';
import { colors } from '../../../utils/Colors';

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

export default createBottomTabNavigator(
    {
        RestaurantStack: {
            screen: RestaurantStack,
            navigationOptions: () => ({
                tabBarLabel: strings.tabBar.home,
                tabBarIcon: ({ tintColor }) => (<Icon name='home' type={'SimpleLineIcons'} size={EStyleSheet.value('25rem')} color={tintColor} />),
            })
        },
        BookingsStack: {
            screen: BookingsStack,
            navigationOptions: () => ({
                tabBarLabel: strings.tabBar.bookings,
                tabBarIcon: ({ tintColor }) => (<Icon name='book-open' type={'SimpleLineIcons'} size={EStyleSheet.value('25rem')} color={tintColor} />),
            })
        },
        ProfileStack: {
            screen: ProfileStack,
            navigationOptions: () => ({
                tabBarLabel: strings.tabBar.profile,
                tabBarIcon: ({ tintColor }) => (<Icon name='user' type={'SimpleLineIcons'} size={EStyleSheet.value('25rem')} color={tintColor} />),
            })
        },
    },
    {
        tabBarOptions: {
            showLabel: true,
            activeTintColor: colors.green_light,
            inactiveTintColor: colors.ash_dark,
            style: {
                backgroundColor: colors.white,
                shadowColor: colors.ash_light,
                shadowOffset: { width: 0, height: 10 },
                shadowRadius: 15,
                elevation: 10,
                borderTopColor: colors.ash_lighter
            }
        },
        initialLayout: 'RestaurantStack'
    }
);