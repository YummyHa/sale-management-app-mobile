import React from 'react';
import { StackNavigator } from 'react-navigation';
import { Root } from 'native-base';
import Login from './container/LoginContainer';

const App = StackNavigator({
  Login: { screen: Login }
}, {
  initialRouteName: 'Login',
  headerMode: 'none'
});

export default () => (
  <Root>
    <App />
  </Root>
);
