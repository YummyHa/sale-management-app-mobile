import React, { Component } from "react";
import _ from 'lodash';
import { Container, Content, Header, Left, Body, Right, Text, Title, Button, Icon, View } from 'native-base';
import { StatusBar, Image, Platform } from 'react-native'; 

import styles from './styles';
import Colors from "../../../constants/Colors";

class ProductDetail extends Component {
  render() {
    const data = this.props.data;
    return (
      <Container>
        <StatusBar translucent={false} />
        {/* Header */}
        <Header>
          {/* Header Left */}
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon active ios='ios-arrow-back' android='md-arrow-back' style={styles.headerIconStyle} />
              {Platform.OS === 'ios' ? <Text style={styles.headerBackText}>Lùi</Text> : null}
            </Button>
          </Left>

          {/* Header Body */}
          <Body>
            <Title>Chi tiết</Title>
          </Body>

          {/* Header Right */}
          <Right />
        </Header>

        {/* Content */}
        <Content padder>
          <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
            {data.image === '' ? <View style={styles.viewImageStyle} >
              <Text note>Chưa có hình ảnh</Text>
            </View>
            : <Image source={{ uri: data.image }} style={styles.imageStyle} />}
          </View>

          <View style={styles.wrapper}>
            {/* serial */}
            <View style={styles.card}>
              <Text style={styles.titleTextStyle}>Mã sản phẩm</Text>
              <Text style={styles.valueTextStyle}>{data.serial}</Text>
            </View>
      
            {/* name */}
            <View style={styles.card}>
              <Text style={styles.titleTextStyle}>Tên sản phẩm</Text>
              <Text style={styles.valueTextStyle}>{data.name}</Text>
            </View>

            {/* desc */}
            <View style={styles.card}>
              <Text style={styles.titleTextStyle}>Mô tả</Text>
              <Text style={styles.valueTextStyle}>
                {data.description !== '' ? data.description : 'Chưa có mô tả'}
              </Text>
            </View>

            {/* orginial price */}
            <View style={styles.card}>
              <Text style={styles.titleTextStyle}>Giá gốc</Text>
              <Text style={styles.valueTextStyle}>{data.origin_price} đ</Text>
            </View>

            {/* sell price */}
            <View style={styles.card}>
              <Text style={styles.titleTextStyle}>Giá bán</Text>
              <Text style={styles.valueTextStyle}>{data.sell_price} đ</Text>
            </View>

            {/* quantity */}
            <View style={styles.card}>
              <Text style={styles.titleTextStyle}>Số lượng tồn</Text>
              <Text style={styles.valueTextStyle}>{data.quantity}</Text>
            </View>
          </View>

          <Text note style={{ padding: 10 }}>Thuộc tính sản phẩm</Text>

          <View style={styles.wrapper}>
            {console.log(data.attributes)}
            {data.attributes.map((r, i) => (
              <View key={r._id} style={styles.card}>
                <Text style={styles.titleTextStyle}>{r.name}</Text>
                <Text style={styles.valueTextStyle}>
                  {r.value !== '' ? r.value : 'Không có'}
                </Text>
              </View>
            ))}
          </View>
        </Content>

        <Button full style={{ backgroundColor: Colors.tintColor }} onPress={() => this.props.onEdit()}>
          <Text style={{ color: '#fff' }}>Sửa sản phẩm</Text>
        </Button>
        <Button full style={{ backgroundColor: Colors.secondTintColor }} onPress={() => this.props.onDelete()} >
          <Text style={{ color: '#fff' }}>Xoá sản phẩm</Text>
        </Button>
      </Container>
    ); 
  }
}

export default ProductDetail;
