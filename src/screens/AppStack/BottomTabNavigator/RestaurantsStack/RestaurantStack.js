import { createStackNavigator } from 'react-navigation';
import RestaurantScreen from './RestaurantScreen';

export const RestaurantStack = createStackNavigator(
    {
        RestaurantScreen: {
            screen: RestaurantScreen,
            headerMode: 'none',
            header: null,
            navigationOptions: {
                header: null
            }
        }
    },
    {
        initialRouteName: 'RestaurantScreen'
    }
);