import React, { Component } from 'react';

import Contact from '../../screens/Contact';

class ContactContainer extends Component {
  render() {
    return <Contact navigation={this.props.navigation} />
  }
}

export default ContactContainer;
