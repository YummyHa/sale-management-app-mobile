import React from 'react';
import Expo from 'expo';
import { Container, Text } from 'native-base';
import { StatusBar, AsyncStorage } from 'react-native';

class AuthLoading extends React.Component {
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
