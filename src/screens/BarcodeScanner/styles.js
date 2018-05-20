import { StyleSheet, Platform } from "react-native";

import Colors from '../../../constants/Colors';

const BUTTON_COLOR = Platform.OS === 'ios' ? '#fff' : '#666';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  preview: {
    ...StyleSheet.absoluteFillObject,
  },
  toolbar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
});

export default styles;
