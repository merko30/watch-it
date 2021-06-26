import React, {useRef, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TextInputProps,
  StyleProp,
  ViewStyle,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import Animated, {
  useSharedValue,
  useDerivedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {useTheme} from '@shopify/restyle';
import Icon from 'react-native-vector-icons/Ionicons';

import theme, {Theme, Box, Text} from '../theme';

const LINE_HEIGHT = 16;
const PADDING_VERTICAL = 8;
const MARGIN_VERTICAL = 5;

const styles = StyleSheet.create({
  input: {
    paddingVertical: PADDING_VERTICAL,
    lineHeight: LINE_HEIGHT,
    flex: 1,
    position: 'relative',
  },
  labelStyle: {
    marginVertical: MARGIN_VERTICAL,
    fontWeight: '600',
    color: theme.colors.background,
  },
  textarea: {
    borderWidth: 1,
    borderColor: theme.colors.lightGray,
    borderRadius: theme.borderRadii.s,
    paddingLeft: 5,
  },
  eye: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
});

interface TextFieldProps extends TextInputProps {
  label?: string;
  error?: string;
  touched?: boolean;
  animateLabel?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<ViewStyle>;
}

const TextField = ({
  label,
  touched,
  error,
  containerStyle,
  labelStyle,
  numberOfLines = 1,
  animateLabel = true,
  ...props
}: TextFieldProps) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const {colors} = useTheme<Theme>();
  const ref = useRef<TextInput>(null);
  const TRANSLATE = MARGIN_VERTICAL + PADDING_VERTICAL + LINE_HEIGHT;
  const focused = useSharedValue(0);
  const isTextArea = props.multiline;
  // const color = mixColor(focused, 'rgb(0,0,0)', 'rgb(0,0,0)', 'rgb');

  // const fontWeight = mix(focused, 400, 600);

  const translateY = useDerivedValue(() => {
    return focused.value === 1 ? 0 : TRANSLATE;
  });

  useEffect(() => {
    if (props.value) {
      if (props.value.length) {
        focused.value = 1;
      } else {
        focused.value = 0;
      }
    }
  }, [props.value]);

  const minHeight =
    Platform.OS === 'ios' && numberOfLines
      ? LINE_HEIGHT * numberOfLines
      : undefined;

  const textAreaStyles = isTextArea
    ? {...styles.textarea, paddingLeft: 5}
    : null;
  const hidePassword = props.secureTextEntry && !passwordVisible;

  const style = useAnimatedStyle(() => ({
    transform: [{translateY: withTiming(translateY.value, {duration: 300})}],
  }));
  return (
    <View style={containerStyle}>
      {label && (
        <Animated.Text style={[styles.labelStyle, style, labelStyle]}>
          {label}
        </Animated.Text>
      )}
      <Box
        flexDirection="row"
        borderBottomColor="lightGray"
        borderBottomWidth={1}
        alignItems="center">
        <TextInput
          {...props}
          numberOfLines={Platform.OS === 'ios' ? undefined : numberOfLines}
          ref={ref}
          placeholderTextColor={colors.foreground}
          style={[
            props.style,
            styles.input,
            textAreaStyles,
            {
              color: colors.foreground,
              minHeight,
            },
          ]}
          onFocus={() => {
            focused.value = 1;
          }}
          onBlur={() => {
            if (!props.value) {
              focused.value = 0;
            }
          }}
          secureTextEntry={hidePassword}
        />
        {props.secureTextEntry && (
          <TouchableWithoutFeedback
            style={styles.eye}
            onPressIn={() => setPasswordVisible(true)}
            onPressOut={() => setPasswordVisible(false)}>
            <Icon name="eye-outline" color={colors.foreground} size={24} />
          </TouchableWithoutFeedback>
        )}
      </Box>
      {touched && error && (
        <Text variant="small" color="negative" marginTop="s">
          {error}
        </Text>
      )}
    </View>
  );
};

export default TextField;
