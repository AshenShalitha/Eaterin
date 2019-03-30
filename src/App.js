import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import firebase from 'react-native-firebase';
import { MainSwitchNavigator } from './screens/MainSwitchNavigator';
import reducers from './redux/reducers';
import NavigationService from './services/NavigationService';

const topicName = 'Notifications';

export default class App extends Component {

  async componentDidMount() {
    this.checkPermission();
  }

  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.subscribe();
    }
  }

  async subscribe() {
    firebase.messaging().subscribeToTopic(topicName);
  }

  // async getToken() {
  //   let fcmToken = await AsyncStorage.getItem('fcmToken');
  //   console.log('tokennnnnnn', fcmToken);
  //   if (!fcmToken) {
  //     fcmToken = await firebase.messaging().getToken();
  //     if (fcmToken) {
  //       // user has a device token
  //       await AsyncStorage.setItem('fcmToken', fcmToken);
  //     }
  //   }
  // }

  // async requestPermission() {
  //   try {
  //     await firebase.messaging().requestPermission();
  //     // User has authorised
  //     this.getToken();
  //   } catch (error) {
  //     // User has rejected permissions
  //     console.log('permission rejected');
  //   }
  // }

  render() {
    return (
      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
        <MainSwitchNavigator
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
      </Provider>
    );
  }
}

