import { StyleSheet } from "react-native";

import Colors from '../../../constants/Colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FBFAFA'
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
    color: Colors.tintColor
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
    borderRadius: 5,
    margin: 5,
    marginBottom: 0,
  },
  addProductFAB: {
    backgroundColor: Colors.secondTintColor
  }
});

export default styles;
