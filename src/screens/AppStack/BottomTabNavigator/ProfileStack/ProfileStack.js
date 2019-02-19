import { createStackNavigator } from 'react-navigation';
import ProfileScreen from './ProfileScreen';

export const ProfileStack = createStackNavigator(
    {
        ProfileScreen: {
            screen: ProfileScreen,
            headerMode: 'none',
            header: null,
            navigationOptions: {
                header: null
            }
        }
    },
    {
        initialRouteName: 'ProfileScreen'
    }
);