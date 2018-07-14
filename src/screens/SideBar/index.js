import React from 'react'
import { Text, Container, List, ListItem, Content, Toast, View } from 'native-base'
import { AsyncStorage } from 'react-native'
import Axios from 'axios'

import Colors from '../../../constants/Colors';
import URL from '../../../constants/serverUrl';

const routes = [
  {
    route: 'Category',
    caption: 'Loại sản phẩm',
  },
  {
    route: 'AddProduct',
    caption: 'Thêm sản phẩm',
  },
  {
    route: 'ProductList',
    caption: 'Nhập hàng',
  },
  {
    route: 'Customers',
    caption: 'Khách hàng',
  },
  {
    route: 'Logout',
    caption: 'Đăng xuất',
  }
]

export default class SideBar extends React.PureComponent {
  showToast = (message) => {
    Toast.show({
      text: message,
      duration: 2000,
      position: 'bottom',
      textStyle: { textAlign: 'center' }
    })
  }

  logOut = async () => {
    try {
      let userToken = await AsyncStorage.getItem('userToken');
      await Axios.delete(
        `${URL}/api/users/me/token`, { 
          data: {},
          headers: { 'x-auth': userToken } 
        }
      )
      
      await AsyncStorage.removeItem('userToken');
      this.props.navigation.navigate('Auth');

      this.showToast('Đăng xuất thành công!');
    } catch (error) {
      this.showToast('Đăng xuất thất bại !');
    }
  }

  render() {
    return (
      <Container>
        <View style={{ paddingTop: 50, paddingLeft: 12, backgroundColor: Colors.tintColor, paddingBottom: 20 }}>
          <Text style={{ color: '#fff' }}>Tên cửa hàng: {this.props.user.shop_name}</Text>
          <Text style={{ color: '#fff' }}>Chủ cửa hàng: {this.props.user.user_name}</Text>
          <Text style={{ color: '#fff' }}>{this.props.user.email}</Text>
        </View>
        <Content>
          <List 
            style={{ marginTop: 20 }}
            dataArray={routes}
            renderRow={data => {
              return (
                <ListItem
                  button
                  onPress={() => {
                    if (data.route === 'Logout') {
                      this.logOut()
                    } else {
                      this.props.navigation.navigate(data.route);
                    }
                  }}
                  noBorder
                >
                  <Text>{data.caption}</Text>
                </ListItem>
              )
            }}
          />
        </Content>
      </Container>
    );
  }
}
