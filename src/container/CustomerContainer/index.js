import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Toast } from 'native-base';
import _ from 'lodash';

import Customers from '../../screens/Customers';
import * as actions from './actions';

class CustomerContainer extends Component {
  state = {
    isAddModalOpen: false,
    isEditModalOpen: false,
  }

  async componentWillMount() {
    await this.props.customerFetch();
  }

  toggleAddModal() {
    this.state.isAddModalOpen ? this.setState({ isAddModalOpen: false }) 
      : this.setState({ isAddModalOpen: true })
  }

  toggleEditModal() {
    this.state.isEditModalOpen ? this.setState({ isEditModalOpen: false }) 
      : this.setState({ isEditModalOpen: true })
  }

  async onAddNewCustomer() {
    let name = this.props.customerName;
    let address = this.props.customerAddress;
    let phone = this.props.customerPhone;
    let fb = this.props.customerFacebook;
    let zalo = this.props.customerZalo;

    if (name === '') {
      this.props.checkCustomerInfo('Tên');
    } else if (phone === '') {
      this.props.checkCustomerInfo('Số điện thoại');
    } else {
      await this.props.addNewCustomer({ name, address, phone, fb, zalo }, 
        () => this.showToast('Thêm thành công!'),
        () => this.showToast('Thêm thất bại!'));
      this.toggleAddModal();
      await this.props.customerFetch();
    }
  }

  async onSaveCustomer() {
    let name = this.props.customerName;
    let address = this.props.customerAddress;
    let phone = this.props.customerPhone;
    let fb = this.props.customerFacebook;
    let zalo = this.props.customerZalo;
    let id = this.props.editingID;

    if (name === '') {
      this.props.checkCustomerInfo('Tên');
    } else if (phone === '') {
      this.props.checkCustomerInfo('Số điện thoại');
    } else {
      await this.props.updateCustomer({ id, name, address, phone, fb, zalo }, 
        () => this.showToast('Sửa thành công!'),
        () => this.showToast('Sửa thất bại!'));
      this.toggleEditModal();
      await this.props.customerFetch();
    }
  }

  async onEditCustomer(id) {
    var customer = _.find(this.props.customers, { '_id': id });

    this.props.parseValueToEdit(customer);

    this.toggleEditModal();
  }

  updateCustomerInOrderingList(id) {
    if (this.props.isFromOrder) {
      var customer = _.find(this.props.customers, { '_id': id });
      this.props.updateCustomerInCart(customer, () => this.props.navigation.goBack());
    }
  }

  onRemoveCustomer(id) {
    console.log(id);
    let list = this.props.customers.slice();
    let removeIndex = list.map(function (item) { return item._id; })
      .indexOf(id);
    ~removeIndex && list.splice(removeIndex, 1);
    this.props.deleteCustomer(id, list);
  }

  showToast = (message) => {
    Toast.show({
      text: message,
      position: 'bottom',
      type: 'warning',
      duration: 1500
    });
  }

  onGoBack() {
    this.props.setCheckFromOrderToFalse();
    this.props.navigation.goBack();
  } 

  render() {
    return <Customers 
      goBack={() => this.onGoBack()}
      navigation={this.props.navigation}
      customerModalVisible={this.state.isAddModalOpen}
      toggleAddModal={() => this.toggleAddModal()}
      customerUpdate={(prop, value) => this.props.customerUpdateProp(prop, value)}
      onAddNewCustomer={() => this.onAddNewCustomer()}
      customerFacebook={this.props.customerFacebook}  
      customerZalo={this.props.customerZalo}
      customerPhone={this.props.customerPhone}
      customerAddress={this.props.customerAddress}
      customerName={this.props.customerName}
      isSavingCustomer={this.props.isSavingCustomer}
      data={this.props.customers}
      updateCustomerNameInOrderingList={id => this.updateCustomerInOrderingList(id)}
      onRemoveCustomer={id => this.onRemoveCustomer(id)}
      check={this.props.checkMessage}
      onEditCustomer={id => this.onEditCustomer(id)}
      onSaveCustomer={() => this.onSaveCustomer()}
      EditModalVisible={this.state.isEditModalOpen}
      onCancelEdit={() => this.props.onCancelCustomer(() => this.toggleEditModal())}
    />
  }
}

const mapStateToProps = state => {
  const { customers, customerName, customerAddress, customerPhone, customerZalo, customerFacebook, isSavingCustomer, checkMessage, editingID, isFromOrder } = state.customer;
  return { customers, customerName, customerAddress, customerPhone, customerZalo, customerFacebook, isSavingCustomer, checkMessage, editingID, isFromOrder }
}

export default connect(mapStateToProps, actions)(CustomerContainer);
