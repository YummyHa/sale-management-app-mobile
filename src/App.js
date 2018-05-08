import React from 'react';
import { StackNavigator, SwitchNavigator, TabNavigator, TabBarBottom } from 'react-navigation';
import { Root } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';

import Colors from '../constants/Colors';

import Login from './container/LoginContainer';
import Products from './container/ProductContainer';
import AuthLoading from './container/AuthLoadingContainer';
import Customers from './container/CustomerContainer';
import Bills from './container/BillContainer';
import Summary from './container/SummaryContainer';
import Settings from './container/SettingContainer';

const HomeStack = TabNavigator({
  Products: { screen: Products },
  Bills: { screen: Bills },
  Customers: { screen: Customers },
  Summary: { screen: Summary },
  Settings: { screen: Settings }
}, {
  navigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused }) => {
      const { routeName } = navigation.state;
      let iconName;
      switch (routeName) {
        case 'Products': 
          iconName = Platform.OS === 'ios'
            ? `ios-keypad${focused ? '' : '-outline'}`
            : `md-keypad`;
          break;
        case 'Bills': 
          iconName = Platform.OS === 'ios'
            ? `ios-paper${focused ? '' : '-outline'}`
            : `md-paper`;
          break;
        case 'Customers': 
          iconName = Platform.OS === 'ios'
            ? `ios-contacts${focused ? '' : '-outline'}`
            : `md-contacts`;
          break;
        case 'Summary': 
          iconName = Platform.OS === 'ios'
            ? `ios-stats${focused ? '' : '-outline'}`
            : `md-stats`;
          break;
        case 'Settings': 
          iconName = Platform.OS === 'ios'
            ? `ios-construct${focused ? '' : '-outline'}`
            : `md-construct`;
          break;
      }
      return (
        <Ionicons
          name={iconName}
          size={28}
          style={{ marginBottom: -3 }}
          color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
        />
      );
    },
  }),
  tabBarComponent: TabBarBottom,
  tabBarPosition: 'bottom',
  animationEnabled: true,
  swipeEnabled: false,
  tabBarOptions: {
    activeTintColor: Colors.tabIconSelected,
    inactiveTintColor: Colors.tabIconDefault,
  }
})

const AuthStack = StackNavigator({
  Login: { screen: Login }
}, {
  headerMode: 'none'
})

const App = SwitchNavigator({
  Auth: AuthStack, 
  Home: HomeStack,
  AuthLoading: AuthLoading
}, {
  initialRouteName: 'AuthLoading'
});

export default () => (
  <Root>
    <App />
  </Root>
);
