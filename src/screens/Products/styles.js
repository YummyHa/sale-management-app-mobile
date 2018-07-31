import { StyleSheet, Platform } from "react-native";

import Colors from '../../../constants/Colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E9EBEE'
  },
  priceStyle: {
    color: Colors.tintColor
  },
  listProduct: {
    marginBottom: 1,
    borderBottomWidth: 0,
    borderBottomColor: 'transparent',
  },
  headerIconStyle: {
    color: Platform.OS === 'ios' ? Colors.tintColor : '#fff'
  },
  noBottomBorder: {
    borderBottomWidth: 0
  },
  cartIconStyle: {
    paddingTop: 5,
    fontSize: 28,
    color: Colors.secondTintColor
  },
  itemWrapper: {
    borderWidth: 0.2,
    borderColor: Colors.textColor,
    backgroundColor: '#fff',
    borderRadius: 5,
    margin: 5,
    marginBottom: 0,
  },
  addProductFAB: {
    backgroundColor: Colors.secondTintColor
  }
});

export default styles;
