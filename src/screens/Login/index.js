import React, { Component } from 'react';
import { StyleSheet, Picker, Platform } from 'react-native';
import { Container, Content, Button, Footer, View, Icon, Text, Header, 
  Title, Body, Tabs, Tab } from 'native-base';
 
class Login extends Component {
  renderLogin() {
    return <Content style={{ marginTop: 15 }}>
      {this.props.loginForm}
      <View padder>
        <Button block onPress={() => this.props.onLogin()}>
          <Text>Đăng nhập</Text>
        </Button>
      </View>
    </Content>
  }

  renderRegister() {
    makeList = (branches) => {
      if (branches !== []) {
        d = branches.map((item, i) => (
          <Picker.Item label={item.shop_type} value={item._id} key={i} />
        ));
        d.unshift(<Picker.Item label='Chọn loại shop' value={null} key='nan' />);
      } else {
        d = <Picker.Item label='Chưa có loại shop' value={null} key='nan' />
      }
  
      return d
    }

    {/* Branch Section */}
    <View style={styles.category}>
      <Text style={styles.categoryLabel}>Loại shop:</Text>
      <Picker
        mode='dropdown'
        style={{ width: 150 }}
        selectedValue={this.props.selected}
        onValueChange={this.props.onChangeCategory}
      >
        {makeList(this.props.branches)}            
      </Picker>
      <Button transparent onPress={() => NavigationService.navigate('Category')}>
        <Icon ios='ios-add-circle-outline' android='md-add-circle' style={styles.barcodeIconStyle} />
      </Button>
    </View>
    
    return <Content>
      {this.props.registerForm}

      {/* Branch Section */}
      <View style={styles.category}>
        <Text style={styles.categoryLabel}>Loại shop:</Text>
        <Picker
          mode='dropdown'
          style={{ width: 150 }}
          selectedValue={this.props.selected}
          onValueChange={this.props.onChangeBranch}
        >
          {makeList(this.props.branches)}            
        </Picker>
      </View>

      <View padder>
        <Button block onPress={() => this.props.onRegister()}>
          <Text>Đăng ký</Text>
        </Button>
      </View>
    </Content>
  }

  render() {
    const {  } = styles;

    return (
      <Container>
        <Header style={{ height: 200, borderBottomWidth: 0 }}>
          <Body style={{ alignItems: 'center' }}>
            <Title>Sale Management</Title>
            <View padder>
              <Text style={{ color: '#000' }}>
                Easy manager your shop need
              </Text>
            </View>
          </Body>
        </Header>

        <Tabs>
          <Tab heading='Đăng nhập'>
            {this.renderLogin()}
          </Tab>

          <Tab heading='Đăng ký'>
            {this.renderRegister()}  
          </Tab>
        </Tabs>

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
  category: {
    paddingTop: Platform.OS === 'ios' ? 0 : 5,
    paddingBottom: Platform.OS === 'ios' ? 0 : 5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderStyle: 'solid',
    borderColor: '#dadada',
    borderWidth: 0.5,
    borderRadius: 5,
  },
  categoryLabel: {
    marginRight: 15,
  },
});

export default Login;
