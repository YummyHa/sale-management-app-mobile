import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';

import AuthLoading from '../../screens/AuthLoading';

class AuthLoadingContainer extends Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // async componentWillMount() {
  //   await AsyncStorage.removeItem('userToken');
  // }

  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    this.props.navigation.navigate(userToken ? 'Home' : 'Auth');
  } 

  render() {
    return <AuthLoading />
  }
}

export default AuthLoadingContainer;
