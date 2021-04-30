import React, { useContext } from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle
} from 'react-native';
import { ThemeContext } from "./themeContext";
// import Colors from '../constants/colors';

interface Props extends TextInputProps {
  width: number;
  height?: number;
  icon?: string;
  iconColor?: string;
  showIcon?: boolean;
  error?: string;
  disabled?: boolean;
  touched?: boolean;
  style?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<ViewStyle>;
}

export default function TextIn({
  icon,
  iconColor,
  showIcon,
  error,
  disabled,
  touched,
  style,
  inputStyle,
  ...props
}: Props): JSX.Element {
  const { spacing, typography } = useContext(ThemeContext);

  const renderError = () => {
    if (error && touched) {
      return <Text style={styles.error}>{error || 'Provide error pls'}</Text>;
    }
  };

  return (
    <View style={[style]}>
        <TextInput
          editable={disabled ? false : true}
          placeholderTextColor={'#9AAABA'}
          {...props}
          style={[
            typography.label,
            styles.text,
            { color: disabled ? '#9AAABA' : '#000000' },
          ]}
        />
      {renderError()}
    </View>
  );
}

const styles = StyleSheet.create({
  error: {
    color: '#F36E21',
    fontSize: 12,
    marginTop: 4,
  },

  view: {
    paddingHorizontal: 24,
  },

  text: {
    flex: 1,
    paddingRight: 16,
  },
});
