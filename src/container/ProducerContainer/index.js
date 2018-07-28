import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Toast } from 'native-base';
import _ from 'lodash';

import Producer from '../../screens/Producer';
import * as actions from './actions';

class ProducerContainer extends Component {
  state = {
    isAddModalOpen: false,
    isEditModalOpen: false, 
  }

  async componentWillMount() {
    await this.props.producerFetch();
  }

  toggleAddModal() {
    this.state.isAddModalOpen ? this.setState({ isAddModalOpen: false }) 
      : this.setState({ isAddModalOpen: true })
  }

  toggleEditModal() {
    this.state.isEditModalOpen ? this.setState({ isEditModalOpen: false }) 
      : this.setState({ isEditModalOpen: true })
  }

  async onAddNewProducer() {
    let name = this.props.name;
    let address = this.props.address;
    let phone = this.props.phone;

    if (name === '') {
      this.props.checkProducerInfo('Tên');
    } else if (phone === '') {
      this.props.checkProducerInfo('Số điện thoại');
    } else if (address === '') {
      this.props.checkProducerInfo('Địa chỉ');
    } else {
      await this.props.addNewProducer({ name, address, phone }, 
        () => this.showToast('Thêm thành công!', 'success'),
        () => this.showToast('Thêm thất bại!', 'warning'));
      this.toggleAddModal();
      await this.props.producerFetch();
    }
  }

  async onSaveProducer() {
    let name = this.props.name;
    let address = this.props.address;
    let phone = this.props.phone;
    let id = this.props.editingID;

    if (name === '') {
      this.props.checkProducerInfo('Tên');
    } else if (phone === '') {
      this.props.checkProducerInfo('Số điện thoại');
    } else if (address === '') {
      this.props.checkProducerInfo('Địa chỉ');
    } else {
      await this.props.updateProducer({ id, name, address, phone }, 
        () => this.showToast('Sửa thành công!', 'success'),
        () => this.showToast('Sửa thất bại!', 'warning'));
      this.toggleEditModal();
      await this.props.producerFetch();
    }
  }

  async onEditProducer(id) {
    var producer = _.find(this.props.producers, { '_id': id });

    await this.props.parseValueToEditProducer(producer);

    this.toggleEditModal();
  }

  updateProducerInReceipt(id) {
    if (this.props.isFromReceipt) {
      var producer = _.find(this.props.producers, { '_id': id });
      this.props.updateProducerInReceipt(producer, () => this.props.navigation.goBack());
    }
  }

  onRemoveProducer(id) {
    let list = this.props.producers.slice();
    let removeIndex = list.map(function (item) { return item._id; })
      .indexOf(id);
    ~removeIndex && list.splice(removeIndex, 1);
    this.props.deleteProducer(id, list);
  }

  showToast = (message, type) => {
    Toast.show({
      text: message,
      position: 'bottom',
      type: type,
      duration: 1500
    });
  }

  onGoBack() {
    this.props.setSelectFromReceiptToFalse();
    this.props.navigation.goBack();
  } 

  render() {
    return <Producer 
      goBack={() => this.onGoBack()}
      navigation={this.props.navigation}
      addModalVisible={this.state.isAddModalOpen}
      toggleAddModal={() => this.toggleAddModal()}
      producerUpdate={(prop, value) => this.props.producerUpdateProp(prop, value)}
      onAddNewProducer={() => this.onAddNewProducer()}
      phone={this.props.phone}
      address={this.props.address}
      name={this.props.name}
      isSavingProducer={this.props.isSavingProducer}
      data={this.props.producers}
      updateProducerNameinReceipt={id => this.updateProducerInReceipt(id)}
      onRemoveProducer={id => this.onRemoveProducer(id)}
      check={this.props.checkMessage}
      onEditProducer={id => this.onEditProducer(id)}
      onSaveProducer={() => this.onSaveProducer()}
      editModalVisible={this.state.isEditModalOpen}
      onCancelEdit={() => this.props.onCancelProducer(() => this.toggleEditModal())}
    />
  }
}

const mapStateToProps = state => {
  const { producers, name, address, phone, isSavingProducer, checkMessage, editingID, isFromReceipt } = state.producer;
  return { producers, name, address, phone, isSavingProducer, checkMessage, editingID, isFromReceipt }
}

export default connect(mapStateToProps, actions)(ProducerContainer);
