import React, { Component } from 'react';
import { Item, Input, Icon, Toast, Form, Container, Text } from 'native-base';
import { Field, reduxForm, formValueSelector, reset } from 'redux-form';
import axios from 'axios';
import { AsyncStorage, Alert } from 'react-native';
import { connect } from 'react-redux';

import Login from '../../screens/Login';
import URL from '../../../constants/serverUrl';
import * as actions from './actions';

// validators
const required = value => (value ? undefined : 'Required');
const maxLength = max => value => value && value.length > max 
  ? `Must be ${max} characters or less` : undefined;
const maxLength24 = maxLength(24);

const minLength = min => value => value && value.length < min 
  ? `Must be ${min} characters or more` : undefined;
const minLength6 = minLength(6);

const email = value => 
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined;
const alphaNumeric = value => 
  value && /[^a-zA-Z0-9]/i.test(value)
    ? 'Only alphanumeric characters'  
    : undefined;

class LoginForm extends Component {
  state = {
    selectedTab: 0,
  }

  onChangeTab(i) {
    this.setState({ selectedTab: i })
  }

  renderInput({ input, label, type, meta: { touched, error, warning } }) {
    return (
      <Item error={error && touched}>
        <Input 
          ref={c => {this.textInput = c}}
          placeholder={input.name === 'email' ? 'Email' : input.name === 'shop_name' ? 'Tên shop' : input.name === 'user_name' ? 'Tên chủ shop' : input.name === 'address' ? 'Địa chỉ' : input.name === 'phone' ? 'Số điện thoại' : input.name === 'password' ? 'Mật khẩu' : 'Nhập lại mật khẩu'}
          secureTextEntry={input.name === 'password' ? true : input.name === 're_password' ? true : false}
          {...input}
        />
      </Item>
    );
  }

  componentWillMount() {
    this.props.fetchListBranches();
  }

  checkLogin = async (email, password) => {
    try {
      const user = await axios.post(
        `${URL}/api/users/login`,
        { email, password }
      )
      if (!user) return null;

      return user;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  showToastLoginFailed = () => {
    Toast.show({
      text: 'Enter valid Username and Password',
      duration: 2000,
      position: 'bottom',
      textStyle: { textAlign: 'center' }
    })
  } 

  showToast = (text) => {
    Toast.show({
      text,
      duration: 2000,
      position: 'bottom',
      textStyle: { textAlign: 'center' }
    })
  } 

  deleteUser = async (user) => {
    try {
      let header = user.headers['x-auth'];
  
      await axios.delete(
        `${URL}/api/users/me/token`, { 
          data: {},
          headers: { 'x-auth': header } 
        }
      );
    } catch (err) {
      console.log('delete token failed with message', err.message);
    }
  }

  checkRegister = async (email, password, shop_name, user_name, address, phone, branch) => {
    try {
      const user = await axios.post(
        `${URL}/api/users`,
        { email, password, shop_name, user_name, address, phone_number: phone, _branch: branch }
      )
      if (!user) return false;
      this.deleteUser(user);

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async register() {
    if (this.props.valid) {
      if (this.props.branch === 'nan' || this.props.branch === null) {
        this.showToast('vui lòng chọn loại shop');
      } else {
        if (this.props.password !== this.props.re_password) {
          this.showToast('Mật khẩu nhập lại không đúng');
        } else {
          let check = await this.checkRegister(this.props.email.toLowerCase(), this.props.password, this.props.shop_name, this.props.user_name, this.props.address, this.props.phone, this.props.branch);
          if (check) Alert.alert(
            'Thank you',
            'Cảm ơn bạn đã đăng ký tài khoản, xin hãy vui lòng đợi trong khi quản trị viên duyệt tài khoản của bạn!',
            [
              {text: 'OK', onPress: async () => {
                await this.props.updateUser({ prop: 'branch', value: null });
                this.props.navigation.navigate('Welcome');
              }}
            ]
          );

        }
      }
    } else {
      this.showToast('vui lòng nhập đầy đủ các trường phía trên');
    }
  }

  async login() {
    let user = await this.checkLogin(this.props.email.toLowerCase(), this.props.password);
    if (user === null) {
      this.showToastLoginFailed();
    } else {
      if (user.data.status === 0) {
        await this.deleteUser(user);
        this.props.navigation.navigate('Welcome');
      } else {
        let header = user.headers['x-auth'];
        await AsyncStorage.setItem('userToken', header);
        this.props.navigation.navigate('Home');
      }
    }
  }

  onChangeBranch(value) {
    this.props.updateUser({ prop: 'branch', value });
  }

  render() {
    const form = (
      <Form>
        <Field 
          name='email'
          component={this.renderInput}
          validate={[email, required]}
        />
        <Field 
          name='password'
          component={this.renderInput}
          validate={[alphaNumeric, minLength6, maxLength24, required]}
        />
      </Form>
    );

    const registerForm = (
      <Form>
        <Field 
          name='email'
          component={this.renderInput}
          validate={[email, required]}
        />
        <Field 
          name='shop_name'
          component={this.renderInput}
          validate={[required]}
        />
        <Field 
          name='user_name'
          component={this.renderInput}
          validate={[required]}
        />
        <Field 
          name='address'
          component={this.renderInput}
          validate={[required]}
        />
        <Field 
          name='phone'
          component={this.renderInput}
          validate={[required]}
        />
        <Field 
          name='password'
          component={this.renderInput}
          validate={[required]}
        />
        <Field 
          name='re_password'
          component={this.renderInput}
          validate={[required]}
        />
      </Form>
    )

    return (
      <Login 
        navigation={this.props.navigation}
        loginForm={form}
        registerForm={registerForm}
        onLogin={() => this.login()}
        branches={this.props.branches}
        selected={this.props.branch}
        onChangeBranch={value => this.onChangeBranch(value)}
        onRegister={() => this.register()}
        changeTab={(i) => this.onChangeTab(i)}
        selectedTab={this.state.selectedTab}
      />
    );
  }
}

const LoginContainer = reduxForm({
  form: 'Login'
})(LoginForm);

const selector = formValueSelector('Login');

LoginContainerRedux = connect(
  state => {
    const { branches, branch } = state.auth;
    const { email, password, re_password, shop_name, user_name, address, phone } = selector(state, 'email', 'password', 're_password', 'shop_name', 'user_name', 'address', 'phone');
    return { email, password, branches, branch, re_password, shop_name, user_name, address, phone }
  },
  actions
)(LoginContainer);

export default LoginContainerRedux;
