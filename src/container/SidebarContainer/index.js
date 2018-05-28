import React from 'react'
import Sidebar from '../../screens/SideBar';

class SidebarContainer extends React.PureComponent {
  render() {
    return <Sidebar navigation={this.props.navigation} />
  }
}

export default SidebarContainer
