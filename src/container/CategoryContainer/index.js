import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Alert } from 'react-native';
import { Toast } from 'native-base';
import _ from 'lodash';

import CategoryScreen from '../../screens/Category';

import { categoryUpdate, updateAttrList, addNewCategory, parseValueToEdit, editCategory, deleteCategory } from './actions';
import { fetchListCategories } from '../ProductContainer/actions';

class CategoryContainer extends Component {
  state = {
    cateModalVisible: false,
    editCateModalVisible: false
  }

  toggleAddModal() {
    this.state.cateModalVisible ? this.setState({ cateModalVisible: false }) 
      : this.setState({ cateModalVisible: true })
  }

  toggleEditModal() {
    this.state.editCateModalVisible ? this.setState({ editCateModalVisible: false }) 
      : this.setState({ editCateModalVisible: true })
  }

  async attributeUpdate(text) {
    if (text.substr(text.length - 1) === ',') {
      let str = text.substr(0);
      while (str.substr(0, 1) === ',') {
        str = str.substr(1);
      }

      var str1 = str.slice(0, -1);
      if (str1 !== "") await this.props.updateAttrList(str1.trim());
  
      this.props.categoryUpdate({ prop: 'tempAttr', value: '' });
    } else {
      this.props.categoryUpdate({ prop: 'tempAttr', value: text });
    }
  }

  async onAddNewCategory() {
    var name = this.props.cateName.trim();
    var desc = this.props.cateDesc.trim();
    var attribute = this.props.attr;

    if (name === '') {
      this.props.categoryUpdate({ prop: 'checkMessage', value: 'Vui lòng nhập tên loại' });
    } else {
      await this.props.addNewCategory({ name, desc, attribute },
        () => this.showToast('Thêm thành công!'),
        () => this.showToast('Thêm thất bại!'));
      await this.props.fetchListCategories();
      this.toggleAddModal();
    }
  }

  async onEditCategory() {
    var _id = this.props.editingID;
    var name = this.props.cateName.trim();
    var desc = this.props.cateDesc.trim();
    var attribute = this.props.attr;

    if (name === '') {
      this.props.categoryUpdate({ prop: 'checkMessage', value: 'Vui lòng nhập tên loại' });
    } else {
      await this.props.editCategory({ _id, name, desc, attribute },
        () => this.showToast('Lưu thành công!'),
        () => this.showToast('Lưu thất bại!'));
      await this.props.fetchListCategories();
      this.toggleEditModal();
    }
  }

  async onDelete(id) {
    Alert.alert(
      'Cảnh báo',
      'Bạn có chắc muốn xoá loại sản phẩm này chứ?',
      [
        {text: 'Không', style: 'cancel'},
        {text: 'Có', onPress: async () => { 
          await this.props.deleteCategory(id, () => this.showToast('Xoá thành công!'),
          () => this.showToast('Xoá thất bại!')); 
          this.props.fetchListCategories(); 
        }}
      ],
      {cancelable: false}
    )
  }

  async onOpenEditCategoryPage(id) {
    var category = _.find(this.props.categories, { '_id': id });

    this.props.parseValueToEdit(category);

    this.toggleEditModal();
  }

  showToast = (message) => {
    Toast.show({
      text: message,
      position: 'bottom',
      duration: 1500
    });
  }

  render() {
    return (
      <CategoryScreen 
        data={this.props.categories}
        isFetching={this.props.isFetchingCategories}
        navigation={this.props.navigation}
        cateModalVisible={this.state.cateModalVisible}
        editCateModalVisible={this.state.editCateModalVisible}
        toggleAddModal={() => this.toggleAddModal()}
        toggleEditModal={() => this.toggleEditModal()}
        categoryUpdate={({prop, value}) => this.props.categoryUpdate({prop, value})}
        cateName={this.props.cateName}
        cateDesc={this.props.cateDesc}
        cateAttr={this.props.tempAttr}
        attr={this.props.attr}
        attributeUpdate={(text) => this.attributeUpdate(text)}
        onAddNewCategory={() => this.onAddNewCategory()}
        isSavingCate={this.props.isSavingCate}
        check={this.props.checkMessage}
        onOpenEditCategoryPage={(id) => this.onOpenEditCategoryPage(id)}
        onEditCategory={() => this.onEditCategory()}
        onDelete={(id) => this.onDelete(id)}
      />
    )
  }
}

const mapStateToProps = (state) => {
  const { categories, isFetchingCategories, cateName, cateDesc, tempAttr, attr, checkMessage, isSavingCate, editingID } = state.category;

  return { categories, isFetchingCategories, cateName, cateDesc, tempAttr, attr, checkMessage, isSavingCate, editingID }
}

const mapDispatchToProps = {
  fetchListCategories,
  updateAttrList,
  categoryUpdate,
  addNewCategory,
  parseValueToEdit,
  editCategory,
  deleteCategory
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryContainer);
