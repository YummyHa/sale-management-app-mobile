import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import Receipt from '../../screens/Receipt';

import { addProductToReceiptList, updateReceiptQuantity, removeItemInReceiptList, 
  updateReceiptPrice, updateNote, onSelectProducer, addNewReceipt } from './actions';
import { fetchListProducts, fetchListReceipts } from '../ProductContainer/actions';

class ReceiptContainer extends Component {
  state = {
    searchModalVisible: false
  }

  toggleSearchModal() {
    isVisible = this.state.searchModalVisible
    isVisible ? this.setState({ searchModalVisible: false }) : this.setState({ searchModalVisible: true })
  }

  onAddProductToReceiptList(item) {
    const list = this.props.receiptList;

    this.props.addProductToReceiptList({item, list}, () => this.toggleSearchModal());
  }

  onUpdateListReceiptQuantity(index, value) {
    let val = parseInt(value);
    if (_.isNaN(val)) val = 1;
    this.props.updateReceiptQuantity(val, index);
  }

  onUpdateListReceiptPrice(index, value) {
    let val = parseInt(value);
    if (_.isNaN(val)) val = 0;
    this.props.updateReceiptPrice(val, index);
  }

  async onAddNewReceipt() {
    const { producer, receiptList, total, note } = this.props;
    await this.props.addNewReceipt({
      producer,
      receiptList,
      total,
      note
    }, () => this.props.navigation.goBack(),
      () => this.showToast('Có lỗi xảy ra'));
    await this.props.fetchListReceipts();
    await this.props.fetchListProducts();
  }

  render() {
    return <Receipt 
      navigation={this.props.navigation} 
      searchModalVisible={this.state.searchModalVisible}
      toggleSearchModal={() => this.toggleSearchModal()}
      products={this.props.products}
      addProductToReceiptList={(item) => this.onAddProductToReceiptList(item)}
      totalItem={this.props.receiptTotalItems}
      note={this.props.note}
      total={this.props.total}
      producer={this.props.producer}
      list={this.props.receiptList}
      onUpdateQty={(index, value) => this.onUpdateListReceiptQuantity(index, value)}
      onUpdatePrice={(index, value) => this.onUpdateListReceiptPrice(index, value)}
      removeItemList={list => this.props.removeItemInReceiptList(list)}
      onUpdateNote={(value) => this.props.updateNote(value)}
      onSelectProducer={() => this.props.onSelectProducer(() => this.props.navigation.navigate('Producer'))}
      onAddNewReceipt={() => this.onAddNewReceipt()}
    />
  }
}

const mapStateToProps = state => {
  const { products } = state.product_list;
  const { receiptList, receiptTotalItems, producer, total, note } = state.receipt;

  return { products, receiptList, receiptTotalItems, producer, total, note }
}

const mapDispatchToProps = {
  addProductToReceiptList,
  updateReceiptQuantity,
  updateReceiptPrice,
  removeItemInReceiptList,
  updateNote,
  onSelectProducer,
  fetchListProducts,
  addNewReceipt,
  fetchListReceipts
}

export default connect(mapStateToProps, mapDispatchToProps)(ReceiptContainer);
