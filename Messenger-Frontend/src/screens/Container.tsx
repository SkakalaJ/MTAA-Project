import { useNavigation } from '@react-navigation/core';
import * as React from 'react';
import { appStyles } from '../appStyles';
import {
  LayoutChangeEvent,
  SafeAreaView,
  ScrollViewProps,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle
} from 'react-native';

export type Props = {
  children: React.ReactNode;
  disableHeader?: boolean;
  hasHeaderMenu?: boolean;
  onLayout?: (event: LayoutChangeEvent) => void;
  ready?: boolean;
}

export function Container(props: Props) {
  const navigation = useNavigation();

  return (
    <View style={appStyles.content}>
      <SafeAreaView style={appStyles.safe}>
        <View style={{ flex: 1 }} onLayout={props.onLayout}>
          {(props.ready || props.ready === undefined) && props.children}
        </View>
      </SafeAreaView>
    </View>
  );
}

export function SpacedContainer(props: Props) {
  return (
    <View style={appStyles.content}>
      <SafeAreaView style={appStyles.safe}>
        <View style={appStyles.container} >
          <View style={{ flex: 1 }} onLayout={props.onLayout}>
            {(props.ready || props.ready === undefined) && props.children}
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({});
