import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { Toast } from 'native-base';
import Axios from 'axios';

import Settings from '../../screens/Settings';

class SettingContainer extends Component {
  showToast = (message) => {
    Toast.show({
      text: message,
      duration: 2000,
      position: 'bottom',
      textStyle: { textAlign: 'center' }
    })
  }

  logOut = async () => {
    try {
      let userToken = await AsyncStorage.getItem('userToken');
      await Axios.delete(
        'http://localhost:3000/api/users/me/token', { 
          data: {},
          headers: { 'x-auth': userToken } 
        }
      )
      
      await AsyncStorage.removeItem('userToken');
      this.props.navigation.navigate('Auth');

      this.showToast('Logout successful!');
    } catch (error) {
      this.showToast('Something wrong happened!');
    }
  }

  render() {
    return <Settings onLogout={() => this.logOut()}/>
  }
}

export default SettingContainer;
