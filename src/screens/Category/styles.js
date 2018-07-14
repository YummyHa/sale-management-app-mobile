import { StyleSheet } from "react-native";

import Colors from '../../../constants/Colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FBFAFA'
  },
  headerIconStyle: {
    color: Colors.tintColor
  },
  headerText: {
    color: Colors.tintColor
  },
  itemIcon: {
    fontSize: 20,
    color: '#dadada'
  },
  customer: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  listItem: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderBottomWidth: 0.5,
    borderBottomColor: '#bdbdbd'
  },
  container: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f8f8f8',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center'
  },
  textStyle: {
    width: 100
  }
});

export default styles;