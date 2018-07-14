import React, { Component } from 'react';

import Welcome from '../../screens/Welcome';

class WelcomeContainer extends Component {
  render() {
    return <Welcome navigation={this.props.navigation} />
  }
}

export default WelcomeContainer;
