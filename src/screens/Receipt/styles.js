import { StyleSheet, Platform } from "react-native";

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
    color: Platform.OS === 'ios' ? Colors.tintColor : '#fff'
  },
  noBottomBorder: {
    borderBottomWidth: 0
  },
  itemWrapper: {
    borderWidth: 0.2,
    borderColor: Colors.textColor,
    borderRadius: 5,
    margin: 5,
    marginBottom: 0,
  },
  searchBoxStyle: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    margin: 5,
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  total: { 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 15, 
    backgroundColor: Colors.secondTintColor 
  },
  listItem: {
    paddingTop: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderBottomWidth: 0,
    borderBottomColor: Colors.textColor
  },
});

export default styles;
