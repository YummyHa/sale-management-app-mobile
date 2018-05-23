import React, { Component } from "react";
import { Container, Content, Header, Left, Body, Right, Text, Title, Button, Icon } from 'native-base';
import { StatusBar } from 'react-native';

import styles from './styles';

class Customers extends Component {
  render() {
    return (
      <Container style={styles.container}>
        <StatusBar translucent={false} />
        {/* Header */}
        <Header>
          {/* Header Left */}
          <Left>
            <Button transparent>
              <Icon 
                active
                name='menu'
                onPress={() => {}}
              />
            </Button>
          </Left>

          {/* Header Body */}
          <Body>
            <Title>Customers</Title>
          </Body>

          {/* Header Right */}
          <Right />
        </Header>

        {/* Content */}
        <Content padder>
          <Text>This is customer screen</Text>
        </Content>
      </Container>
    ); 
  }
}

export default Customers;
