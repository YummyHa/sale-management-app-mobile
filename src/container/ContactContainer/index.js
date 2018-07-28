import React, { Component } from 'react';
import { connect } from 'react-redux';
import SocketIOClient from 'socket.io-client';
 
import Contact from '../../screens/Contact';
import url from '../../../constants/serverUrl';

import * as actions from './actions';

class ContactContainer extends Component {
  constructor(props) {
    super(props);
    this.socket = SocketIOClient(url);
    this.handleAddMessage = this.handleAddMessage.bind(this);
  }

  componentDidMount() {
    this.onChatJoinListener();
    this.onReveiveMessageListener();
  }

  sortString(a, b) {
    let check = a.localeCompare(b);
    let result = check < 0 ? a+'-'+b : b+'-'+a;
    return result; 
  }

  onChatJoinListener() {
    var { _id, _admin } = this.props.user;
    var params = { fromId: _id, toId: _admin, room: this.sortString(_id, _admin) }
    this.socket.on('connect', () => {
      this.socket.emit('join', params, function(err) {
        if (err) {
          alert(err);
        } else {
          console.log('Join chat successful');
        }
      })
    })
  }

  async handleAddMessage(message) {
    var { from, to, text, room, createdAt } = message;
    var mes = { from, to, text, room, createdAt }
    await this.props.addMessage(mes);
  }

  onReveiveMessageListener() {
    this.socket.on('newMessage', this.handleAddMessage)
  }

  onSendMessage() {
    var { _id, _admin } = this.props.user;
    var message = this.props.message;
    var mes = { from: _id, to: _admin, text: message };

    // send to socket
    this.socket.emit('createMessage', mes, () => {
      // code
    });
  }

  render() {
    return <Contact 
      navigation={this.props.navigation} 
      messages={this.props.messages}
      message={this.props.message}
      user={this.props.user._id}
      onUpdateCurrentMessage={(message) => this.props.updateCurrentMessage(message)}
      onSendMessage={() => this.onSendMessage()}
    />
  }
}

const mapStateToProps = state => {
  const { user } = state.sidebar;
  const { message, messages } = state.message;

  return { user, message, messages };
}

export default connect(mapStateToProps, actions)(ContactContainer);
