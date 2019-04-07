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
    this.createNotificationListeners(); 
  }

  componentWillUnmount() {
    this.notificationListener();
    this.notificationOpenedListener();
  }

  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      console.log(enabled)
      this.subscribe();
    }
  }

  async subscribe() {
    console.log('ok', topicName)
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

  async createNotificationListeners() {
    /*
    * Triggered when a particular notification has been received in foreground
    * */
    this.notificationListener = firebase.notifications().onNotification((notification) => {
        const { title, body } = notification;
        this.showAlert(title, body);
    });
  
    /*
    * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
    * */
    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
        const { title, body } = notificationOpen.notification;
        this.showAlert(title, body);
    });
  
    /*
    * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
    * */
    const notificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
        const { title, body } = notificationOpen.notification;
        this.showAlert(title, body);
    }
    /*
    * Triggered for data only payload in foreground
    * */
    this.messageListener = firebase.messaging().onMessage((message) => {
      //process data message
      console.log(JSON.stringify(message));
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

