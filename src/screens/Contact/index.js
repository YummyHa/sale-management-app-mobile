import React, { Component } from "react";
import { Container, Content, Header, Left, Body, Right, Text, Title, Button, Icon, View } from 'native-base';
import { StatusBar } from 'react-native';

import Colors from "../../../constants/Colors";
import URL from '../../../constants/serverUrl';

class Welcome extends Component {
  render() {
    return (
      <Container>
        <StatusBar translucent={false} />
        <Header>
          <Left />
          <Body>
            <Title>Hỗ trợ</Title>
          </Body>
          <Right />
        </Header>
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
          <Text note>
            Chức năng đang trong quá trình hoàn thiện!
          </Text>
        </View>
      </Container>
    ); 
  }
}

export default Welcome;
