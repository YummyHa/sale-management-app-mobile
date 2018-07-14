import React from 'react'
import { connect } from 'react-redux'

import Sidebar from '../../screens/SideBar';
import * as actions from './actions';

class SidebarContainer extends React.PureComponent {
  async componentWillMount() {
    await this.props.fetchUser();
  }
  
  render() {
    return <Sidebar 
      navigation={this.props.navigation} 
      user={this.props.user}
    />
  }
}

const mapStateToProps = state => {
  const { user } = state.sidebar;

  return { user }
}

export default connect(mapStateToProps, actions)(SidebarContainer)
