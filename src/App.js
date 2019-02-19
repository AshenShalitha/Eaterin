import React, { Component } from 'react';
import { MainSwitchNavigator } from './screens/MainSwitchNavigator';

import NavigationService from './services/NavigationService';

export default class App extends Component {
  render() {
    return (
      <MainSwitchNavigator
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
    );
  }
}

