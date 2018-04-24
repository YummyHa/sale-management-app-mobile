import React, { Component } from 'react';
import { Item, Input, Icon, Toast, Form } from 'native-base';
import { Field, reduxForm } from 'redux-form';

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

  login() {
    if (this.props.valid) {
      
    } {
      Toast.show({
        text: 'Enter valid Username and Password',
        duration: 2000,
        position: 'bottom',
        textStyle: { textAlign: 'center' }
      })
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

export default LoginContainer;
