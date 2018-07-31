import React from 'react'
import { Header, Left, Body, Right, Container, Content, Text, Button, Icon, Title,
  ListItem, Spinner, View, Form, Item, Input } from 'native-base'
import { Platform, TouchableOpacity, Modal, ScrollView } from 'react-native'
import { createFilter } from 'react-native-search-filter';
import { SearchBar } from 'react-native-elements';

import styles from './styles'
import Colors from '../../../constants/Colors';

const KEYS_TO_FILTER = ['name', 'description']

export default class CategoryScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ''
    }
  }

  searchUpdated(term) {
    this.setState({ searchTerm: term })
  }

  renderCategoryForm() {
    const { inputTextStyle, inputContainerStyle, textStyle, formStyle } = styles;
    return (
      <View>
        <Form style={formStyle}>
          <Item style={inputContainerStyle}>
            <Text style={textStyle}>Tên loại</Text>
            <Input
              style={inputTextStyle}
              placeholder='Nhập tên'
              placeholderTextColor='#cecece'
              onChangeText={text => this.props.categoryUpdate({ prop: 'cateName', value: text })}
              value={this.props.cateName}
            />
          </Item>
          <Item style={inputContainerStyle}>
            <Text style={textStyle}>Mô tả</Text>
            <Input
              style={inputTextStyle}
              placeholder='Nhập mô tả'
              placeholderTextColor='#cecece'
              onChangeText={text => this.props.categoryUpdate({ prop: 'cateDesc', value: text })}
              value={this.props.cateDesc}
            />
          </Item>
          <Item style={inputContainerStyle}>
            <Text style={textStyle}>Thuộc tính</Text>
            <Input
              style={inputTextStyle}
              placeholder='Ví dụ: Màu sắc, Kích thước'
              placeholderTextColor='#cecece'
              onChangeText={text => this.props.attributeUpdate(text)}
              value={this.props.cateAttr}
            />
          </Item>
          <Content>
            <View style={{ flexDirection: 'row', margin: 10 }}>
            {this.props.attr.map((item, i) => (
              <View key={i} style={{ backgroundColor: Colors.thirdTintColor, borderRadius: 25, margin: 3 }}>
                <Text style={{ color: '#fff', fontSize: 14, margin: 5 }}>#{item}</Text>
              </View>
            ))}
            </View>
          </Content>
        </Form>
      </View>
    );
  }

  renderAddCateModal() {
    const { containerStyle } = styles;

    return (
      <Container style={containerStyle}>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.toggleAddModal()} >
              {Platform.OS === 'ios' ? <Text style={styles.headerIconStyle}>Huỷ</Text> : <Icon name="close" style={styles.headerIconStyle} />}
            </Button>
          </Left>

          <Body>
            <Title>Thêm loại</Title>
          </Body>

          <Right />
        </Header>

        <Content>
          <View style={{ justifyContent: 'center', alignItems: 'center', margin: 10 }}>
            <Text style={{ color: Colors.secondTintColor }}>{this.props.check}</Text>
          </View>
          {this.renderCategoryForm()}

          {this.props.isSavingCate ? <Button
            info
            full
            rounded
            style={{ marginTop: 20, marginLeft: 10, marginRight: 10, backgroundColor: Colors.tintColor }}
          >
            <Spinner color='#fff' />
          </Button> 
          : <Button
              full
              rounded
              style={{ marginTop: 20, marginLeft: 10, marginRight: 10, backgroundColor: Colors.tintColor }}
              onPress={() => this.props.onAddNewCategory()}
            >
              <Text style={{ color: '#fff' }}>Thêm</Text>
            </Button>}
        </Content>
      </Container>
    );
  }

  renderEditCateModal() {
    const { containerStyle } = styles;

    return (
      <Container style={containerStyle}>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.toggleEditModal()} >
              {Platform.OS === 'ios' ? <Text style={styles.headerIconStyle}>Huỷ</Text> : <Icon name="close" style={styles.headerIconStyle} />}
            </Button>
          </Left>

          <Body>
            <Title>Sửa loại</Title>
          </Body>

          <Right />
        </Header>

        <Content>
          <View style={{ justifyContent: 'center', alignItems: 'center', margin: 10 }}>
            <Text style={{ color: Colors.secondTintColor }}>{this.props.check}</Text>
          </View>
          {this.renderCategoryForm()}

          {this.props.isSavingCate ? <Button
            info
            full
            rounded
            style={{ marginTop: 20, marginLeft: 10, marginRight: 10, backgroundColor: Colors.tintColor }}
          >
            <Spinner color='#fff' />
          </Button> 
          : <Button
              full
              rounded
              style={{ marginTop: 20, marginLeft: 10, marginRight: 10, backgroundColor: Colors.tintColor }}
              onPress={() => this.props.onEditCategory()}
            >
              <Text style={{ color: '#fff' }}>Lưu</Text>
            </Button>}
        </Content>
      </Container>
    );
  }

  _renderItem = ({ item }) => {
    return (
      <View>
        <ListItem style={{ marginLeft: 0, marginRight: 0 }} onPress={() => {}}>
          <Body>
            <Text>{item.name}</Text>
            <Text note style={{ marginTop: 5 }}>{item.description === '' ? 'Không có mô tả' : item.description}</Text>
            <View style={{ marginTop: 5, flexDirection: 'row', marginLeft: 8 }}>
              <Text note>Thuộc tính: </Text>
              {item.attributes.map((r, i) => (
                <Text key={i} note>#{r} </Text>
              ))}
            </View>
          </Body>
          <Right>
            <TouchableOpacity style={{ padding: 3, marginBottom: 7 }} onPress={() => this.props.onOpenEditCategoryPage(item._id)}>
              <Text style={{ color: Colors.tintColor }}>Sửa</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ padding: 3 }} onPress={() => this.props.onDelete(item._id)}>
              <Text style={{ color: Colors.secondTintColor }}>Xoá</Text>
            </TouchableOpacity>
          </Right>
        </ListItem>
      </View>
    );
  }

  render() {
    const filteredCategories = this.props.data.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTER))
    return(
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon active ios='ios-arrow-back' android='md-arrow-back' style={styles.headerIconStyle} />
            </Button>
          </Left>
          <Body>
            <Title>Loại sản phẩm</Title>
          </Body>
          <Right>
            <TouchableOpacity style={{ padding: 3 }} onPress={() => this.props.toggleAddModal()}>
              <Text style={styles.headerText}>Thêm</Text>
            </TouchableOpacity>
          </Right>
        </Header>

        <SearchBar 
          lightTheme
          onChangeText={(term) => this.searchUpdated(term)}
          platform={Platform.OS === 'ios' ? 'ios' : 'android'}
          placeholder='Tìm kiếm...'
          containerStyle={{ backgroundColor: '#F8F8F8', borderTopWidth: 0 }}
          inputStyle={{ backgroundColor: '#fff' }}
        />

        {/* screen popup to add new Category */}
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.props.cateModalVisible}
          onRequestClose={() => {}}
        >
          {this.renderAddCateModal()}
        </Modal>
        {/* end */}

        {/* screen popup to edit Category */}
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.props.editCateModalVisible}
          onRequestClose={() => {}}
        >
          {this.renderEditCateModal()}
        </Modal>
        {/* end */}

        <Content padder style={{ backgroundColor: '#fff' }}>
          {this.props.isFetching ? <Spinner /> : 
            filteredCategories.map(item => this._renderItem({item}))}
        </Content>
      </Container>
    )
  }
}