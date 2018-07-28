import React, { Component } from "react";
import { Container, Content, Header, Left, Body, Right, Text, Title, Button, 
  Icon, View, Input } from 'native-base';
import _ from 'lodash';
import { StatusBar, FlatList, StyleSheet, Dimensions } from 'react-native';
import moment from 'moment';

import Colors from "../../../constants/Colors";
import URL from '../../../constants/serverUrl';

const { width, height } = Dimensions.get('window');

class Welcome extends Component {
  _renderItem = ({ item }) => {
    var time = moment(item.createAt).format('h:mm a');
    return (
      <View>
        {item.from === this.props.user 
        ? <View style={styles.bubbleRightContainer}>
          <Text note>{time}</Text>
          <View style={styles.bubbleTextRight}>
            <Text style={{ color: '#fff' }}>{item.text}</Text>
          </View>
        </View>
        : <View style={styles.bubbleLeftContainer}>
          <View style={styles.bubbleTextLeft}>
            <Text style={{ color: '#222222' }}>{item.text}</Text>
          </View>
          <Text note>{time}</Text>
        </View>}
      </View>
    );
  }

  render() {
    return (
      <Container>
        <StatusBar translucent={false} />
        <Header>
          <Left />
          <Body>
            <Title>Hỗ trợ</Title>
          </Body>
          <Right />
        </Header>

        {_.isEmpty(this.props.messages)
        ? <View style={{ backgroundColor: '#F6F6F6', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text note>Bắt đầu chat với admin để được hỗ trợ</Text>
        </View>
        : <FlatList 
          inverted
          data={this.props.messages}
          keyExtractor={item => item.text}
          renderItem={this._renderItem}
          style={{ backgroundColor: '#F6F6F6', flex: 1, padding: 10 }}
        />}
        

        <View style={{ padding: 5, flexDirection: 'row', borderTopWidth: 0.5, borderTopColor: '#F8F8F8' }}>
          <Input 
            placeholder='Tin nhắn...'
            value={this.props.message}
            onChangeText={(text) => this.props.onUpdateCurrentMessage(text)}
            style={{ flex: 1, paddingLeft: 5 }}
          />
          <Button transparent onPress={() => this.props.onSendMessage()}>
            <Icon 
              ios='ios-paper-plane-outline' 
              android='md-paper-plane' 
              style={{ color: Colors.tintColor }} 
            />
          </Button>
        </View>
      </Container>
    ); 
  }
}

const styles = StyleSheet.create({
  bubbleRightContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-end', 
    justifyContent: 'center', 
    alignItems: 'center',
  },
  bubbleTextRight: {
    borderRadius: 8, 
    backgroundColor: Colors.tintColor, 
    justifyContent: 'center', 
    alignItems: 'center',
    marginLeft: 5,
    padding: 10,
    marginBottom: 5,
    maxWidth: 2/3*width
  },
  bubbleLeftContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-start', 
    justifyContent: 'center',
    alignItems: 'center'
  },
  bubbleTextLeft: {
    alignSelf: 'flex-start', 
    borderRadius: 10, 
    backgroundColor: '#d4d7db', 
    justifyContent: 'center', 
    alignItems: 'center',
    marginBottom: 5,
    padding: 10,
    marginRight: 5,
    maxWidth: 2/3*width
  }
})

export default Welcome;
