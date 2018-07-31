import React, { Component } from "react";
import { Container, Content, Header, Left, Body, Right, Text, Title, Button, Icon, 
  ListItem, View } from 'native-base';
import { StatusBar, FlatList, Dimensions, Platform } from 'react-native';

import styles from './styles';
import Colors from "../../../constants/Colors";

const { width } = Dimensions.get('window');

class Bills extends Component {
  renderOrderItem = ({ item }) => {
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

  renderReceiptItem = ({ item }) => {
    let { height, width } = Dimensions.get('window');
    var day = new Date(item.time);
    return (
      <View style={styles.listItems}>
        <View style={{ flex: 2 }}>
          <Text numberOfLines={1} style={{ fontSize: 14 }}>Mã HĐ: {item._id}</Text>
          <Text note numberOfLines={1} style={{ marginTop: 5 }}>Ngày lập: {day.toString().substr(4, 12)}</Text>
          <Text note numberOfLines={1} style={{ marginTop: 5 }}>Nhà cung cấp: {item._producer === null ? 'Không có' : item._producer.name}</Text>
          <Text note numberOfLines={1} style={{ marginTop: 5 }}>Ghi chú: {item.note === '' ? 'Không có ghi chú' : item.status}</Text>
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
          </Left>

          {/* Header Body */}
          <Body>
            <Title>Hoá đơn</Title>
          </Body>

          {/* Header Right */}
          <Right />
        </Header>

        <View style={{ flexDirection: 'row', borderBottomWidth: 0.3 }}>
          <Button style={{ width: width/2, justifyContent: 'center', alignItems: 'center', borderRadius: 0, backgroundColor: '#F8F8F8' }}
            onPress={() => this.props.changeTab(0)}>
            <Text style={{color: this.props.selectedTab === 0 ? Colors.tintColor : '#222222'}}>Bán hàng</Text>
          </Button>

          <Button style={{ width: width/2, justifyContent: 'center', alignItems: 'center', borderRadius: 0, backgroundColor: '#F8F8F8' }}
            onPress={() => this.props.changeTab(1)}>
            <Text style={{color: this.props.selectedTab === 1 ? Colors.tintColor : '#222222'}}>Nhập hàng</Text>
          </Button>
        </View>

        {/* Content */}
        <Content style={{ padding: 10, paddingTop: 0 }}>
          {this.props.selectedTab === 0 ? <FlatList 
            data={this.props.data}
            renderItem={this.renderOrderItem}
            keyExtractor={item => item._id}
          />
          : <FlatList 
            data={this.props.data2}
            renderItem={this.renderReceiptItem}
            keyExtractor={item => item._id}
          />}
        </Content>
      </Container>
    ); 
  }
}

export default Bills;
