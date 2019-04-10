import React from 'react';
import { Dimensions, Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import EStyleSheet from 'react-native-extended-stylesheet';

import { RestaurantStack } from './RestaurantsStack/RestaurantStack';
import { BookingsStack } from './BookingsStack/BookingsStack';
import { ProfileStack } from './ProfileStack/ProfileStack';
import { strings } from '../../../utils/Strings';
import { colors } from '../../../utils/Colors';
import restaurantIcon from '../../../utils/images/restaurant.png';
import bookingsIcon from '../../../utils/images/bookings.png';
import profileIcon from '../../../utils/images/my-account.png';

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

export default createBottomTabNavigator(
    {
        RestaurantStack: {
            screen: RestaurantStack,
            navigationOptions: () => ({
                tabBarLabel: strings.tabBar.home,
                tabBarIcon: ({ tintColor }) => (
                    <Image
                        source={restaurantIcon}
                        style={styles.iconStyle}
                    />
                ),
            })
        },
        BookingsStack: {
            screen: BookingsStack,
            navigationOptions: () => ({
                tabBarLabel: strings.tabBar.bookings,
                tabBarIcon: ({ tintColor }) => (
                    <Image
                        source={bookingsIcon}
                        style={styles.iconStyle}
                    />
                ),
            })
        },
        ProfileStack: {
            screen: ProfileStack,
            navigationOptions: () => ({
                tabBarLabel: strings.tabBar.profile,
                tabBarIcon: ({ tintColor }) => (
                    <Image
                        source={profileIcon}
                        style={styles.iconStyle}
                    />
                ),
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

const styles = EStyleSheet.create({
    iconStyle: {
        height: '25rem',
        width: '25rem'
    }
});
