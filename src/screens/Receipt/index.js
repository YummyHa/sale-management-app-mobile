import React, { Component } from "react";
import { Container, Content, Header, Left, Body, Right, Text, Title, Button, Icon, View } from 'native-base';
import { StatusBar } from 'react-native';

import Colors from "../../../constants/Colors";
import URL from '../../../constants/serverUrl';

class Receipt extends Component {
  render() {
    return (
      <Container>
        <Header>
        <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()} >
              <Icon active name="arrow-back" style={{ color: Colors.tintColor }} />
              <Text style={{color: Colors.tintColor}}>Lùi</Text>
            </Button>
          </Left>
          <Body>
            <Title>Phiếu nhập</Title>
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

export default Receipt;
