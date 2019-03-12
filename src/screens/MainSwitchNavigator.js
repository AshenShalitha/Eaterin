import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import SplashScreen from './SplashScreen';
import { AuthStackNavigator } from './AuthStack/AuthStackNavigator';
import { AppStackNavigator } from './AppStack/AppStackNavigator';


export const MainSwitchNavigator = createAppContainer(createSwitchNavigator(
    {
        Splash: SplashScreen,
        Auth: AuthStackNavigator,
        App: AppStackNavigator
    },
    {
        initialRouteName: 'App',
    }
));
