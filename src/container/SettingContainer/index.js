import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { Toast } from 'native-base';
import Axios from 'axios';

import Settings from '../../screens/Settings';

class SettingContainer extends Component {
  logOut = async () => {
    try {
      let userToken = await AsyncStorage.getItem('userToken');
      console.log('hello')
      console.log(userToken)
      await Axios.delete(
        'http://localhost:3000/api/users/me/token', { 
          data: {},
          headers: { 'x-auth': userToken } 
        }
      )
      await AsyncStorage.removeItem('userToken');
      this.props.navigation.navigate('Auth');

      Toast.show({
        text: 'Logout successful!',
        duration: 2000,
        position: 'bottom',
        textStyle: { textAlign: 'center' }
      })
    } catch (error) {
      Toast.show({
        text: 'Something wrong happened!',
        duration: 2000,
        position: 'bottom',
        textStyle: { textAlign: 'center' }
      })
    }
  }

  render() {
    return <Settings onLogout={() => this.logOut()}/>
  }
}

export default SettingContainer;
