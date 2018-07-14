import React from 'react'
import { Header, Left, Body, Right, Container, Content, Text, Button, Icon, Title,
  ListItem, Spinner, View, Form, Item, Input } from 'native-base'
import { Platform, FlatList, TouchableOpacity, Modal } from 'react-native'

import styles from './styles'
import Colors from '../../../constants/Colors';

export default class CategoryScreen extends React.PureComponent {
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
              <Icon active name="close" style={{ color: Colors.tintColor }} />
              <Text style={{color: Colors.tintColor}}>Huỷ</Text>
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
            <TouchableOpacity style={{ padding: 3 }} onPress={() => {}}>
              <Text style={{ color: Colors.secondTintColor }}>Xoá</Text>
            </TouchableOpacity>
          </Right>
        </ListItem>
      </View>
    );
  }

  render() {
    return(
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon active ios='ios-arrow-back' android='md-arrow-back' style={styles.headerIconStyle} />
              {Platform.OS === 'ios' ? <Text style={styles.headerText}>Lùi</Text> : <View />}
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

        {/* screen popup to add new Category */}
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.props.cateModalVisible}
        >
          {this.renderAddCateModal()}
        </Modal>
        {/* end */}

        <Content padder style={{ backgroundColor: '#fff' }}>
          {this.props.isFetching ? <Spinner /> : 
            <FlatList 
              data={this.props.data}
              renderItem={this._renderItem}
              keyExtractor={item => item._id}
            />}
        </Content>
      </Container>
    )
  }
}