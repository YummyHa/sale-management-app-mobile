import React from 'react';
import { createStackNavigator, createBottomTabNavigator, createSwitchNavigator,
  createDrawerNavigator } from 'react-navigation'
import { Root } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { Platform, Text } from 'react-native';

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
import ProductDetail from './container/ProductDetailContainer';
import EditProduct from './container/EditProductContainer';
import Welcome from './container/WelcomeContainer';
import Contact from './container/ContactContainer';
import Receipt from './container/ReceiptContainer';

const ProductDrawer = createDrawerNavigator({
  ProductList: Products
}, {
  initialRouteName: 'ProductList',
  contentComponent: props => <Sidebar {...props} />
});

const ProductStack = createStackNavigator({
  ProductHome: ProductDrawer,
  AddProduct: AddProduct,
  EditProduct: EditProduct,
  BarCodeScanner: BarCodeScanner,
  Category: Category,
  Cart: Cart,
  ProductDetail: ProductDetail,
  Customers: Customers,
  Settings: Settings,
  Receipt: Receipt,
}, {
  headerMode: 'none'
})

const HomeStack = createBottomTabNavigator({
  Products: ProductStack,
  Bills: Bills,
  Summary: Summary,
  Contact: Contact,
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
        case 'Summary': 
          iconName = Platform.OS === 'ios'
            ? `ios-stats${focused ? '' : '-outline'}`
            : `md-stats`;
          break;
        case 'Contact': 
          iconName = Platform.OS === 'ios'
            ? `ios-chatbubbles${focused ? '' : '-outline'}`
            : `md-chatbubbles`;
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
    tabBarLabel: ({ focused }) => {
      const { routeName } = navigation.state;
      let label;
      switch (routeName) {
        case 'Products': 
          label = 'Trang chủ';
          break;
        case 'Bills': 
          label = 'Hoá đơn';
          break;
        case 'Summary': 
          label = 'Thống kê';
          break;
        case 'Contact': 
          label = 'Hỗ trợ';
          break;
      }
      return (
        <Text style={{ color: focused ? Colors.tabIconSelected : Colors.tabIconDefault, fontSize: 11 }}>{label}</Text>
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
  Login: Login,
  Welcome: Welcome
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
