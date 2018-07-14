import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Toast } from 'native-base';

import Cart from '../../screens/Cart';
import { updateOrderQuantity, updateOrderQuantityByButton, removeItemInOrderingList, discountChange,
  updateOrginTotal, customerPaidChanged, afterChangeTotalAgain, onSelectCustomer,
  addNewOrder } from './actions';
import { fetchListOrders } from '../ProductContainer/actions';

class CartContainer extends Component {
  state = {
    isModalVisible: false
  }

  toggleModal() {
    this.state.isModalVisible ? this.setState({ isModalVisible: false }) 
      : this.setState({ isModalVisible: true });
  }
  
  onUpdateOrderQuantity(index, value) {
    let val = parseInt(value);
    if (_.isNaN(val)) val = 0;
    this.props.updateOrderQuantity(val, index);
  }

  onMinusQuantity(index, quantity) {
    this.props.updateOrderQuantityByButton('minus', index);
    if (quantity === 1) {
      let list = this.props.orderingList.slice();
      ~index && list.splice(index, 1);
      this.props.removeItemInOrderingList(list);
    }
  }

  onPaidChanged(value) {
    let val = parseFloat(value);
    val = Math.round(val);
    if (_.isNaN(val)) val = 0;
    if (val < 0) {
      alert('Không thể nhập giá trị bé hơn 0');
      this.props.customerPaidChanged(0);
    } else {
      this.props.customerPaidChanged(val);
    }
  }

  onDiscountChanged(value) {
    let val = parseFloat(value);
    if (_.isNaN(val)) val = 0;
    if (val > 100 || val < 0) {
      alert('Không thể giảm giá quá 100% hoặc bé hơn 0 %');
      this.props.discountChange(0);
      this.props.updateOrginTotal();
    } else if (val === 0) {
      this.props.updateOrginTotal();
    } else {
      this.props.discountChange(val);
    }
  }
  
  async onAddNewOrder() {
    const { customer, total, orderingList, paidmoney, discount } = this.props;
    await this.props.addNewOrder({
      customer,
      orderingList,
      total,
      paidmoney,
      discount
    }, () => this.props.navigation.goBack(),
      () => this.showToast('Thất bại'),
      () => this.toggleModal());
    this.props.fetchListOrders();
  }

  showToast = (message) => {
    Toast.show({
      text: message,
      position: 'bottom',
      duration: 1500
    });
  }

  render() {
    _.isEmpty(this.props.customer) ? customerName='Chọn khách hàng' : customerName=this.props.customer.name;
    return <Cart 
      navigation={this.props.navigation}
      totalProd={this.props.orderingTotalItems}
      list={this.props.orderingList}
      customer={customerName}
      total={this.props.total}
      onUpdateQty={(index, value) => this.onUpdateOrderQuantity(index, value)}
      removeItemList={list => this.props.removeItemInOrderingList(list)}
      onMinusQty={(index, quantity) => this.onMinusQuantity(index, quantity)}
      onPlusQty={index => this.props.updateOrderQuantityByButton('plus', index)}
      onDiscountChanged={value => this.onDiscountChanged(value)}
      onPaidChanged={value => this.onPaidChanged(value)}
      discount={this.props.discount}
      paidmoney={this.props.paidmoney}
      changeback={this.props.changeback}
      onAddNewOrder={() => this.onAddNewOrder()}
      onSelectCustomer={() => this.props.onSelectCustomer(() => this.props.navigation.navigate('Customers'))}
      toggleModal={() => this.toggleModal()}
      isModalVisible={this.state.isModalVisible}
    />
  }
}

const mapStateToProps = (state) => {
  const { orderingList, orderingTotalItems, customer, total, discount, paidmoney, changeback } = state.cart;

  return { orderingList, orderingTotalItems, customer, total, discount, paidmoney, changeback }
}

const mapDispatchToProps = {
  updateOrderQuantity, updateOrderQuantityByButton, removeItemInOrderingList, discountChange,
  updateOrginTotal, customerPaidChanged, afterChangeTotalAgain, onSelectCustomer,
  addNewOrder, fetchListOrders
}

export default connect(mapStateToProps, mapDispatchToProps)(CartContainer);
