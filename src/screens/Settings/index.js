import React, { Component } from "react";
import { Container, Content, Header, Left, Body, Right, Text, Title, Button, Icon } from 'native-base';

import styles from './styles';

class Settings extends Component {
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
            <Title>Settings</Title>
          </Body>

          {/* Header Right */}
          <Right />
        </Header>

        {/* Content */}
        <Content padder>
          <Button block onPress={() => this.props.onLogout()}>
            <Text>Log out</Text>
          </Button>
        </Content>
      </Container>
    ); 
  }
}

export default Settings;
