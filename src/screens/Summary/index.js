import React, { Component } from "react";
import { Container, Content, Header, Left, Body, Right, Text, Title, Button, Icon, 
  View, DatePicker} from 'native-base';
import { StatusBar } from 'react-native'; 

import styles from './styles';
import Colors from "../../../constants/Colors";

class Summary extends Component {
  state = {
    isAnalyzingByProduct: false,
    orderSumType: 'all', 
  }

  renderProductSummary() {
    const data = this.props.productSummary;
    return(
      <View>
        <View style={{ justifyContent: 'center', alignItems: 'center', padding: 10 }}>
          <Text>Thống kê kho</Text>
        </View>
        <View style={styles.wrapperContent}>
          <Text style={{marginTop: 10}}>Tổng số sản phẩm: {data.totalProduct}</Text>
          <Text style={{marginTop: 10}}>Tổng số lượng sản phẩm: {data.totalProductQuantity}</Text>
          <Text style={{marginTop: 10}}>Tổng giá gốc: {data.totalOriginPrice}đ</Text>
          <Text style={{marginTop: 10}}>Tổng giá bán: {data.totalSellPrice}đ</Text>
        </View>
      </View>
    );
  }

  renderOrderByDateSum() {
    return <View>
      <View style={styles.orderSummaryDetailWrapper}>
        <Text style={{ padding: 5, marginBottom: 10 }}>Thống kê doanh thu trong ngày</Text>
        <View style={{ padding: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text note>Số hàng đã bán</Text>
          <Text style={{ color: Colors.secondTintColor }}>{this.props.orderSummaryByDate.totalProductSelled}</Text>
        </View>

        <View style={{ padding: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text note>Số lượng hàng đã bán</Text>
          <Text style={{ color: Colors.secondTintColor }}>{this.props.orderSummaryByDate.totalProductQuantitySelled}</Text>
        </View>

        <View style={{ padding: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text note>Số tiền thu về</Text>
          <Text style={{ color: Colors.secondTintColor }}>{this.props.orderSummaryByDate.totalAmount}đ</Text>
        </View>

        <View style={{ padding: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text note>Lợi nhuận</Text>
          <Text style={{ color: Colors.secondTintColor }}>{this.props.orderSummaryByDate.totalEarned}đ</Text>
        </View>
      </View>
    </View>
  }
  
  renderOrderByMonthSum() {
    return <View>
      <View style={styles.orderSummaryDetailWrapper}>
        <Text style={{ padding: 5, marginBottom: 10 }}>Thống kê doanh thu trong tháng này</Text>
        <View style={{ padding: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text note>Số hàng đã bán</Text>
          <Text style={{ color: Colors.secondTintColor }}>{this.props.orderSummaryByMonth.totalProductSelled}</Text>
        </View>

        <View style={{ padding: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text note>Số lượng hàng đã bán</Text>
          <Text style={{ color: Colors.secondTintColor }}>{this.props.orderSummaryByMonth.totalProductQuantitySelled}</Text>
        </View>

        <View style={{ padding: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text note>Số tiền thu về</Text>
          <Text style={{ color: Colors.secondTintColor }}>{this.props.orderSummaryByMonth.totalAmount}đ</Text>
        </View>

        <View style={{ padding: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text note>Lợi nhuận</Text>
          <Text style={{ color: Colors.secondTintColor }}>{this.props.orderSummaryByMonth.totalEarned}đ</Text>
        </View>
      </View>
    </View>
  }

  renderOrderByYearSum() {
    return <View>
      <View style={styles.orderSummaryDetailWrapper}>
        <Text style={{ padding: 5, marginBottom: 10 }}>Thống kê doanh thu trong năm này</Text>
        <View style={{ padding: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text note>Số hàng đã bán</Text>
          <Text style={{ color: Colors.secondTintColor }}>{this.props.orderSummaryByYear.totalProductSelled}</Text>
        </View>

        <View style={{ padding: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text note>Số lượng hàng đã bán</Text>
          <Text style={{ color: Colors.secondTintColor }}>{this.props.orderSummaryByYear.totalProductQuantitySelled}</Text>
        </View>

        <View style={{ padding: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text note>Số tiền thu về</Text>
          <Text style={{ color: Colors.secondTintColor }}>{this.props.orderSummaryByYear.totalAmount}đ</Text>
        </View>

        <View style={{ padding: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text note>Lợi nhuận</Text>
          <Text style={{ color: Colors.secondTintColor }}>{this.props.orderSummaryByYear.totalEarned}đ</Text>
        </View>
      </View>
    </View>
  }

  renderOrderByAll() {
    return <View>
      <View style={styles.orderSummaryDetailWrapper}>
        <Text style={{ padding: 5, marginBottom: 10 }}>Thống kê tất cả doanh thu từ trước đến nay</Text>
        <View style={{ padding: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text note>Số hàng đã bán</Text>
          <Text style={{ color: Colors.secondTintColor }}>{this.props.orderSummaryByAll.totalProductSelled}</Text>
        </View>

        <View style={{ padding: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text note>Số lượng hàng đã bán</Text>
          <Text style={{ color: Colors.secondTintColor }}>{this.props.orderSummaryByAll.totalProductQuantitySelled}</Text>
        </View>

        <View style={{ padding: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text note>Số tiền thu về</Text>
          <Text style={{ color: Colors.secondTintColor }}>{this.props.orderSummaryByAll.totalAmount}đ</Text>
        </View>

        <View style={{ padding: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text note>Lợi nhuận</Text>
          <Text style={{ color: Colors.secondTintColor }}>{this.props.orderSummaryByAll.totalEarned}đ</Text>
        </View>
      </View>
    </View>
  }
  
  renderOrderSummary() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();

    return(
      <View>
        <View style={{ justifyContent: 'center', alignItems: 'center', padding: 10 }}>
          <Text>Thống kê theo doanh thu</Text>
        </View>
        <View style={[{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }, styles.wrapperContent]}>
          <Text>Chọn ngày:</Text>
          <DatePicker 
            locale={"vi"}
            placeHolderText={`${dd}/${mm}/${yyyy}`}
            placeHolderTextStyle={{ color: Colors.secondTintColor }}
            onDateChange={this.props.setDate}
            textStyle={{ color: Colors.secondTintColor }}
          />
        </View>

        <View style={{ flexDirection: 'row' }}>
          <Button 
            style={[styles.chooseTypeButton, styles.buttonTintColor]}
            onPress={() => this.setState({ orderSumType: 'all' })}
          >
            <Text>Tất cả</Text>
          </Button>
          <Button 
            style={[styles.chooseTypeButton, styles.secondButtonColor]}
            onPress={() => this.setState({ orderSumType: 'date' })}
          >
            <Text>Ngày</Text>
          </Button>
          <Button 
            style={[styles.chooseTypeButton, styles.buttonTintColor]}
            onPress={() => this.setState({ orderSumType: 'month' })}
          >
            <Text>Tháng</Text>
          </Button>
          <Button 
            style={[styles.chooseTypeButton, styles.secondButtonColor]}
            onPress={() => this.setState({ orderSumType: 'year' })}
          >
            <Text>Năm</Text>
          </Button>
        </View>

        {this.state.orderSumType === 'date' 
          ? this.renderOrderByDateSum() : this.state.orderSumType === 'month'
          ? this.renderOrderByMonthSum() : this.state.orderSumType === 'year'
          ? this.renderOrderByYearSum() : this.renderOrderByAll()}
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
            <Title>Thống kê</Title>
          </Body>

          {/* Header Right */}
          <Right />
        </Header>

        <View style={{ flexDirection: 'row' }}>
          <Button 
            style={[styles.chooseButton, styles.buttonTintColor]}
            onPress={() => this.setState({ isAnalyzingByProduct: false })}
          >
            <Text>Doanh thu</Text>
          </Button>
          <Button 
            style={[styles.chooseButton, styles.secondButtonColor]}
            onPress={() => this.setState({ isAnalyzingByProduct: true })}
          >
            <Text>Kho</Text>
          </Button>
        </View>

        {/* Content */}
        <Content>
          <View>
            {this.state.isAnalyzingByProduct ? this.renderProductSummary() : this.renderOrderSummary()}
          </View>
        </Content>
      </Container>
    ); 
  }
}

export default Summary;
