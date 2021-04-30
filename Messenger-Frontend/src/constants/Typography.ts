import { StyleProp, TextStyle } from 'react-native';
// import Colors from './colors';

type Typography = {
  label: StyleProp<TextStyle>;
  text: StyleProp<TextStyle>;
  title: StyleProp<TextStyle>;
};

const typography: Typography = {
  label: {
    fontSize: 20,
    color: '#000000',
  },
  text: {
    fontSize: 16,
    color: '#000000',
  },
  title: {
    fontSize: 16,
    color: '#9AAABA',
  },
};

export default typography;
