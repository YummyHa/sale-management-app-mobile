import React from 'react';
import Expo from 'expo';
import { Container } from 'native-base';
import { StatusBar, AsyncStorage } from 'react-native';

class AuthLoading extends React.Component {
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
    return (
      <Container style={{ alignItems: 'center' }}>
        <Expo.AppLoading />
        <StatusBar barStyle='default' />
      </Container>
    );
  }
}

export default AuthLoading;
