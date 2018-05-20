import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Content, Button, Footer, View, Icon, Text, Header, 
  Title, Body } from 'native-base';
 
class Login extends Component {
  render() {
    const {  } = styles;

    return (
      <Container>
        <Header style={{ height: 200 }}>
          <Body style={{ alignItems: 'center' }}>
            <Title>Sale Management</Title>
            <View padder>
              <Text style={{ color: '#000' }}>
                Easy manager your shop need
              </Text>
            </View>
          </Body>
        </Header>

        <Content>
          {this.props.loginForm}
          <View padder>
            <Button block onPress={() => this.props.onLogin()}>
              <Text>Login</Text>
            </Button>
          </View>
        </Content>

        <Footer>
          <View style={{ alignItems: 'center', opacity: 0.5, flexDirection: 'row' }}>
            <View padder>
              <Text style={{ color: '#000' }}>Made with</Text>
            </View>
            <Icon ios='ios-heart' android='md-heart' style={{ color: 'red' }} />
            <View padder>
              <Text style={{ color: '#000' }}>by Khanh Ha</Text>
            </View>
          </View>
        </Footer>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  
});

export default Login;
