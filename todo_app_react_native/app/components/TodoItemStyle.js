import { StyleSheet } from 'react-native';
import * as colors from '../styles/colors';

const styles = StyleSheet.create({
  todoSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.ITEM_BACKGROUND_COLOR,
  },
  todoText: {
    flex: 1,
    height: 35,
    borderWidth: 1,
    borderColor: colors.BACKGROUND_COLOR,
  },
});

export default styles;
