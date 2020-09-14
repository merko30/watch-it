import React, {useRef, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TextInputProps,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  StyleProp,
  ViewStyle,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import Animated, {
  useValue,
  useCode,
  cond,
  eq,
  set,
} from 'react-native-reanimated';
import {timing, useClock} from 'react-native-redash';
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
  const focused = useValue<0 | 1>(0);
  const translateY = useValue(TRANSLATE);
  const clock = useClock();
  const isTextArea = props.multiline;
  // const color = mixColor(focused, 'rgb(0,0,0)', 'rgb(0,0,0)', 'rgb');

  // const fontWeight = mix(focused, 400, 600);

  useCode(
    () => [
      cond(
        eq(focused, 1),
        [set(translateY, timing({clock, from: translateY, to: 0}))],
        [set(translateY, timing({clock, from: translateY, to: TRANSLATE}))],
      ),
    ],
    [focused],
  );

  useEffect(() => {
    if (props.value) {
      if (props.value.length) {
        focused.setValue(1);
      }
    }
  }, [props.value]);

  const onBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    if (!props.value!.length && !ref.current?.isFocused()) {
      focused.setValue(0);
    }
    if (props.onBlur) {
      props.onBlur(e);
    }
  };

  const minHeight =
    Platform.OS === 'ios' && numberOfLines
      ? LINE_HEIGHT * numberOfLines
      : undefined;

  const textAreaStyles = isTextArea
    ? {...styles.textarea, paddingLeft: 5}
    : null;
  const hidePassword = props.secureTextEntry && !passwordVisible;
  return (
    <View style={containerStyle}>
      {label && (
        <Animated.Text
          style={[
            styles.labelStyle,
            {
              transform: [{translateY: animateLabel ? translateY : 0}],
              color: colors.foreground,
            },
            labelStyle,
          ]}>
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
          onFocus={() => focused.setValue(1)}
          onBlur={onBlur}
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
