import { createStackNavigator } from 'react-navigation';
import BookingsScreen from './BookingsScreen';

export const BookingsStack = createStackNavigator(
    {
        BookingsScreen: {
            screen: BookingsScreen,
            headerMode: 'none',
            header: null,
            navigationOptions: {
                header: null
            }
        }
    },
    {
        initialRouteName: 'BookingsScreen'
    }
);