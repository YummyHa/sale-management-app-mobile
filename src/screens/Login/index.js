import React, { Component } from 'react';
import { StyleSheet, Picker, Platform, Dimensions } from 'react-native';
import { Container, Content, Button, Footer, View, Icon, Text, Header, 
  Title, Body, Tabs, Tab, Spinner } from 'native-base';
import Colors from '../../../constants/Colors';
 
const { width, height } = Dimensions.get('window');

class Login extends Component {
  renderLogin() {
    return <Content style={{ marginTop: 15 }}>
      {this.props.loginForm}
      <View padder>
        {this.props.isLoggingIn 
        ? <Button block style={{ backgroundColor: Colors.tintColor }}>
          <Spinner />
        </Button>
        : <Button block style={{ backgroundColor: Colors.tintColor }} onPress={() => this.props.onLogin()}>
          <Text>Đăng nhập</Text>
        </Button>}
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
        <Button block style={{ backgroundColor: Colors.tintColor }} onPress={() => this.props.onRegister()}>
          <Text>Đăng ký</Text>
        </Button>
      </View>
    </Content>
  }

  render() {
    return (
      <Container>
        <Header style={{ height: 100, borderBottomWidth: 0 }}>
          <Body style={{ alignItems: 'center' }}>
            <Title>Shop Management</Title>
          </Body>
        </Header>

        <View style={{ flexDirection: 'row' }}>
          <Button style={{ width: width/2, justifyContent: 'center', alignItems: 'center', borderRadius: 0, backgroundColor: '#F8F8F8' }}
            onPress={() => this.props.changeTab(0)}>
            <Text style={{color: this.props.selectedTab === 0 ? Colors.tintColor : '#222222'}}>Đăng nhập</Text>
          </Button>

          <Button style={{ width: width/2, justifyContent: 'center', alignItems: 'center', borderRadius: 0, backgroundColor: '#F8F8F8' }}
            onPress={() => this.props.changeTab(1)}>
            <Text style={{color: this.props.selectedTab === 1 ? Colors.tintColor : '#222222'}}>Đăng ký</Text>
          </Button>
        </View>
        {this.props.selectedTab === 0 ? this.renderLogin() : this.renderRegister()}

        <Footer style={{ backgroundColor: '#F8F8F8', alignItems: 'center' }}>
          <Text>Copyright 2018</Text>
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
