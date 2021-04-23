import React, { useContext } from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle
} from "react-native";
import { ThemeContext } from "./themeContext";
import Colors from "../constants/colors";

interface Props {
  width: number;
  height?: number;
  title?: string;
  icon?: string;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  primary?: boolean;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  iconStyle?: StyleProp<TextStyle>;
  onPress?: () => void;
}

export default function CustomButton(props: Props) {
  const { spacing, typography } = useContext(ThemeContext);

  const renderText = () => {
    if (props.title !== undefined) {
      return (
        <Text
          style={[
            typography.label,
            styles.text,
            props.textStyle,
            !props.icon ? { textAlign: "center" } : undefined,
            props.disabled ? { color: Colors.textFaded } : undefined,
          ]}
        >
          {props.title}
        </Text>
      );
    }
  };

  const renderSpace = () => {
      return <View style={styles.space}/>;
  };

  return (
    <View style={[props.style]}>
        <TouchableOpacity disabled={props.disabled} onPress={props.onPress}>
            <View style={{
                height: props.height || 64,
                borderRadius: 12,
                paddingHorizontal: 24,
                alignItems: "center",
                justifyContent: 'center',
                flexDirection: "row"
            }}>
                {renderSpace()}
                {renderText()}
            </View>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {

  },

  space: {
    width: 24,
    height: 1,
  },

  text: {
    flex: 1,
  },
});
