import React, { Component } from 'react';

import AuthLoading from '../../screens/AuthLoading';

class AuthLoadingContainer extends Component {
  render() {
    return <AuthLoading navigation={this.props.navigation} />
  }
}

export default AuthLoadingContainer;
