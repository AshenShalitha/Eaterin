import React, { Component } from 'react';
import { Alert, Platform } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import firebase from 'react-native-firebase';
import { MainSwitchNavigator } from './screens/MainSwitchNavigator';
import reducers from './redux/reducers';
import NavigationService from './services/NavigationService';

const topicName = 'Test';

export default class App extends Component {

  async componentDidMount() {
    this.checkPermission();
    this.createNotificationListeners();
  }

  componentWillUnmount() {
    this.notificationListener();
    this.notificationOpenedListener();
  }

  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    console.log(enabled)
    if (enabled) {
      this.subscribe();
    } else {
      this.requestPermission();
    }
  }

  async requestPermission() {
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
      this.subscribe();
    } catch (error) {
      // User has rejected permissions
      console.log('permission rejected');
    }
  }

  async subscribe() {
    firebase.messaging().subscribeToTopic(topicName);
    console.log('subscribed', topicName);
  }

  async createNotificationListeners() {
    // Triggered when a particular notification has been received in foreground
    this.notificationListener = firebase.notifications().onNotification((notification) => {
      console.log(notification);
      const { title, body } = notification;
      this.showAlert(title, body);
    });
  }

  showAlert(title, body) {
    Alert.alert(
      title, body,
      [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false },
    );
  }

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

