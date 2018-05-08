import React, { Component } from "react";
import { Container, Content, Header, Left, Body, Right, Text, Title, Button, Icon } from 'native-base';

import styles from './styles';

class Summary extends Component {
  render() {
    return (
      <Container style={styles.container}>
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
            <Title>Summary</Title>
          </Body>

          {/* Header Right */}
          <Right />
        </Header>

        {/* Content */}
        <Content>
          <Text>This is summary screen</Text>
        </Content>
      </Container>
    ); 
  }
}

export default Summary;
