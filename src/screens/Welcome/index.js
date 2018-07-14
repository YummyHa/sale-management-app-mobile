import React, { Component } from "react";
import { Container, Content, Header, Left, Body, Right, Text, Title, Button, Icon } from 'native-base';
import { StatusBar } from 'react-native';
import axios from 'axios'

import Colors from "../../../constants/Colors";
import URL from '../../../constants/serverUrl';

class Welcome extends Component {
  render() {
    return (
      <Container style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.tintColor }}>
        <StatusBar translucent={false} />
        <Text style={{ fontSize: 20, color: '#fff' }}>
          Tài khoản của bạn đang được duyệt!
        </Text>
      </Container>
    ); 
  }
}

export default Welcome;
