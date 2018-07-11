import React, { Component } from "react";
import _ from 'lodash';
import { Container, Content, Header, Left, Body, Right, Text, Title, Button, Icon, Subtitle, View, Input } from 'native-base';
import { StatusBar, Platform, TouchableOpacity, FlatList, Dimensions, Modal } from 'react-native';

import styles from './styles';
import Colors from "../../../constants/Colors";

class Cart extends Component {
  renderPayModal() {
    return (
      <Container style={{ backgroundColor: '#f8f8f8' }}>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.toggleModal()}>
              <Icon
                name="close"
                style={{ color: Colors.tintColor }}
              />
            </Button>
          </Left>
          <Body>
            <Title>Thanh toán</Title>
          </Body>
          <Right />
        </Header>

        <Content padder>
          <View style={styles.modalContainer}>
            <Text>Tổng giá trị đơn hàng: </Text>
            <Text style={{ color: '#EC9454', fontStyle: 'italic' }}>{this.props.total} vnđ</Text>
          </View>

          <View style={styles.modalContainer}>
            <Text style={styles.textStyle}>Giảm giá (%)</Text>
            <Input
              placeholder='0'
              onChangeText={value => this.props.onDiscountChanged(value)}
              keyboardType='numeric'
              value={this.props.discount.toString()}
            />
          </View>

          <View style={styles.modalContainer}>
            <Text style={styles.textStyle}>Khách hàng trả:</Text>
            <Input
              placeholder='0'
              onChangeText={value => this.props.onPaidChanged(value)}
              value={this.props.paidmoney.toString()}
              keyboardType='numeric'
            />
            <Text style={{ color: '#EC9454', fontStyle: 'italic' }}>vnđ</Text>
          </View>

          <View style={{ height: 10 }}></View>

          <View style={styles.modalContainer}>
            <Text>Tiền thừa trả lại: </Text>
            <Text style={{ color: '#EC9454', fontStyle: 'italic' }}>{this.props.changeback.toString()} vnđ</Text>
          </View>
        </Content>

        {this.props.isAddingOrders ? <Button success full><Spinner color='#fff' /></Button>
          : <Button
            success
            full
            onPress={() => this.props.onAddNewOrder()}
          >
            <Text style={{ color: '#fff' }}>Hoàn thành</Text>
          </Button>}
      </Container>
    );
  }

  renderItem = ({ item }) => {
    let { height, width } = Dimensions.get('window');
    let index = _.findIndex(this.props.list, l => l._id === item._id);
    return (
      <View style={styles.listItem}>
        <View style={{ width: width/3, justifyContent: 'center', alignItems: 'flex-start', marginLeft: 10 }}>
          <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
          <Text note>{item.sell_price}đ</Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: width/2-20 }}>
          <Button transparent onPress={() => this.props.onMinusQty(index, item.quantity)}>
          <Icon ios='ios-arrow-dropleft-outline' android='md-arrow-dropleft-circle' style={{ color: Colors.tintColor }} />
          </Button>

          <Input
            style={{ marginRight: 5, marginLeft: 5, flex: 1, marginBottom: 3, textAlign: 'center' }}
            placeholder="0"
            keyboardType='numeric'
            onChangeText={value => this.props.onUpdateQty(index, value)}
            onEndEditing={() => {
              if (item.quantity === 0) {
                let list = this.props.list.slice();
                ~index && list.splice(index, 1);
                this.props.removeItemList(list);
              }
            }}
            value={item.quantity.toString()}
          />

          <Button transparent onPress={() => this.props.onPlusQty(index)}>
            <Icon ios='ios-arrow-dropright-outline' android='md-arrow-dropright-circle' style={{ color: Colors.tintColor }} />
          </Button>
        </View>
      </View>
    );
  }

  render() {
    return (
      <Container>
        <StatusBar translucent={false} />
        {/* Header */}
        <Header>
          {/* Header Left */}
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon active ios='ios-arrow-back' android='md-arrow-back' style={styles.headerIconStyle} />
              {Platform.OS === 'ios' ? <Text style={styles.headerBackText}>Lùi</Text> : <View />}
            </Button>
          </Left>

          {/* Header Body */}
          <Body>
            <Title>Giỏ hàng</Title>
            <Subtitle>{this.props.totalProd} sản phẩm</Subtitle>
          </Body>

          {/* Header Right */}
          <Right />
        </Header>

        {/* screen popup to pay */}
        <Modal
          animationType='slide'
          transparent={false}
          visible={this.props.isModalVisible}
        >
          {this.renderPayModal()}
        </Modal>
        {/* end */}

        {/* Content */}
        {this.props.list.length === 0 ? <Container style={styles.container}>
          <Text note>Chưa có mặt hàng nào trong giỏ</Text>
        </Container> : <Container>
          <TouchableOpacity style={styles.customer} onPress={() => this.props.onSelectCustomer()}>
            <Icon ios='ios-person-outline' android='md-person' style={styles.icon} />
            <Text style={styles.customerName}>{this.props.customer}</Text>
            <Icon name='ios-arrow-forward' style={styles.icon} />
          </TouchableOpacity>

          <Text style={{ color: '#222', fontSize: 13, margin: 10 }}>Danh sách mặt hàng</Text>

          <Content>
            <FlatList 
              data={this.props.list}
              renderItem={this.renderItem}
              keyExtractor={item => item._id}
            />
          </Content>

          <View style={styles.total}>
            <Text style={{ color: '#fff' }}>Tổng cộng: {this.props.total} đ</Text>
          </View>

          <Button full onPress={() => this.props.toggleModal()} style={{ backgroundColor: Colors.tintColor }}>
            <Text>Thanh toán</Text>
          </Button>
        </Container>}
      </Container>
    ); 
  }
}

export default Cart;
