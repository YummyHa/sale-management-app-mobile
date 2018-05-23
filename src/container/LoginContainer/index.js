import React, { Component } from 'react';
import { Item, Input, Icon, Toast, Form } from 'native-base';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { connect } from 'react-redux';

import Login from '../../screens/Login';

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
  renderInput({ input, label, type, meta: { touched, error, warning } }) {
    return (
      <Item error={error && touched}>
        <Input 
          ref={c => {this.textInput = c}}
          placeholder={input.name === 'email' ? 'Email' : 'Password'}
          secureTextEntry={input.name === 'password' ? true : false}
          {...input}
        />
      </Item>
    );
  }

  checkLogin = async (email, password) => {
    try {
      const user = await axios.post(
        'http://192.168.1.107:3000/api/users/login',
        { email, password }
      )
      if (!user) return false;

      let header = user.headers['x-auth'];
      await AsyncStorage.setItem('userToken', header);
      let token = AsyncStorage.getItem('userToken');
      return true;
    } catch (error) {
      console.log(error);
      return false;
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

  async login() {
    if (this.props.valid) {
      let check = await this.checkLogin(this.props.email, this.props.password);
      check ? this.props.navigation.navigate('Home') : this.showToastLoginFailed();
    } else {
      this.showToastLoginFailed();
    }
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

    return (
      <Login 
        navigation={this.props.navigation}
        loginForm={form}
        onLogin={() => this.login()}
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
    const { email, password } = selector(state, 'email', 'password');
    return { email, password }
  }
)(LoginContainer);

export default LoginContainerRedux;
