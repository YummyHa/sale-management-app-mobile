import React from 'react';
import { createStackNavigator, createBottomTabNavigator, createSwitchNavigator,
  createDrawerNavigator } from 'react-navigation'
import { Root } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';

import Colors from '../constants/Colors';
import NavigationService from './NavigationService';

import Login from './container/LoginContainer';
import Products from './container/ProductContainer';
import AuthLoading from './container/AuthLoadingContainer';
import Customers from './container/CustomerContainer';
import Bills from './container/BillContainer';
import Summary from './container/SummaryContainer';
import Settings from './container/SettingContainer';
import AddProduct from './container/AddProductContainer';
import BarCodeScanner from './container/BarcodeScannerContainer';
import Category from './container/CategoryContainer';
import Sidebar from './container/SidebarContainer';
import Cart from './container/CartContainer';

const ProductDrawer = createDrawerNavigator({
  ProductList: Products
}, {
  initialRouteName: 'ProductList',
  contentComponent: props => <Sidebar {...props} />
});

const ProductStack = createStackNavigator({
  ProductHome: ProductDrawer,
  AddProduct: AddProduct,
  BarCodeScanner: BarCodeScanner,
  Category: Category,
  Cart: Cart,
}, {
  headerMode: 'none'
})

const HomeStack = createBottomTabNavigator({
  Products: ProductStack,
  Bills: Bills,
  Customers: Customers,
  Summary: Summary,
  Settings: Settings,
}, {
  navigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused }) => {
      const { routeName } = navigation.state;
      let iconName;
      switch (routeName) {
        case 'Products': 
          iconName = Platform.OS === 'ios'
            ? `ios-home${focused ? '' : '-outline'}`
            : `md-home`;
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
  animationEnabled: true,
  swipeEnabled: false,
  tabBarOptions: {
    activeTintColor: Colors.tabIconSelected,
    inactiveTintColor: Colors.tabIconDefault,
  }
})

const AuthStack = createStackNavigator({
  Login: Login
}, {
  headerMode: 'none'
})

const RootStackNavigator = createSwitchNavigator({
  Auth: AuthStack, 
  Home: HomeStack,
  AuthLoading: AuthLoading
}, {
  initialRouteName: 'AuthLoading'
});

export default class App extends React.PureComponent {
  render() {
    return (
      <Root>
        <RootStackNavigator 
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef)
          }}
        />
      </Root>
    )
  }
}
