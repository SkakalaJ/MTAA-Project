import { StyleProp, TextStyle } from 'react-native';
import Colors from './colors';

type Typography = {
  label: StyleProp<TextStyle>;
  text: StyleProp<TextStyle>;
  title: StyleProp<TextStyle>;
};

const typography: Typography = {
  label: {
    fontSize: 20,
    color: Colors.text,
  },
  text: {
    fontSize: 16,
    color: Colors.text,
  },
  title: {
    fontSize: 16,
    color: Colors.textFaded,
  },
};

export default typography;
