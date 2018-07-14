import React, { Component } from "react";
import { Container, Content, Header, Left, Body, Right, Text, Title, Button, Icon, 
  ListItem, View } from 'native-base';
import { StatusBar, FlatList, Dimensions } from 'react-native';

import styles from './styles';
import Colors from "../../../constants/Colors";

class Bills extends Component {
  renderItem = ({ item }) => {
    let { height, width } = Dimensions.get('window');
    var day = new Date(item.time);
    return (
      <View style={styles.listItems}>
        <View style={{ flex: 2 }}>
          <Text numberOfLines={1} style={{ fontSize: 14 }}>Mã HĐ: {item._id}</Text>
          <Text note numberOfLines={1} style={{ marginTop: 5 }}>Ngày lập: {day.toString().substr(4, 12)}</Text>
          <Text note numberOfLines={1} style={{ marginTop: 5 }}>Khách hàng: {item._customer === null ? 'Khách vãng lai' : item._customer.name}</Text>
          <Text note numberOfLines={1} style={{ marginTop: 5 }}>Tình trạng: {item.status}</Text>
        </View>

        <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
          <Text numberOfLines={1} style={{ fontSize: 13 }} note>Tổng giá trị</Text>
          <Text style={{ fontSize: 13, color: Colors.secondTintColor, marginTop: 5 }}>{item.total}đ</Text>
        </View>
      </View>
    );
  }

  render() {
    return (
      <Container style={styles.container}>
        <StatusBar translucent={false} />
        {/* Header */}
        <Header>
          {/* Header Left */}
          <Left>
            <Button transparent>
              <Icon 
                active
                name='menu'
                onPress={() => {}}
              />
            </Button>
          </Left>

          {/* Header Body */}
          <Body>
            <Title>Hoá đơn</Title>
          </Body>

          {/* Header Right */}
          <Right />
        </Header>

        {/* Content */}
        <Content style={{ padding: 10, paddingTop: 0 }}>
          <FlatList 
            data={this.props.data}
            renderItem={this.renderItem}
            keyExtractor={item => item._id}
          />
        </Content>
      </Container>
    ); 
  }
}

export default Bills;
