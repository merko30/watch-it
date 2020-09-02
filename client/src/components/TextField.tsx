import React, {useRef, useEffect} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TextInputProps,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  StyleProp,
  ViewStyle,
  Platform,
  processColor,
} from 'react-native';
import Animated, {
  useValue,
  useCode,
  cond,
  eq,
  set,
  concat,
} from 'react-native-reanimated';
import {
  timing,
  useClock,
  interpolateColor,
  mixColor,
} from 'react-native-redash';
import {useTheme} from '@shopify/restyle';

import theme, {Theme} from '../theme';

const LINE_HEIGHT = 16;
const PADDING_VERTICAL = 8;
const MARGIN_VERTICAL = 5;

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.lightGray,
    paddingVertical: PADDING_VERTICAL,
    lineHeight: LINE_HEIGHT,
  },
  labelStyle: {
    marginVertical: MARGIN_VERTICAL,
    fontWeight: '600',
  },
  textarea: {
    borderWidth: 1,
    borderColor: theme.colors.lightGray,
    borderRadius: 5,
    paddingLeft: 5,
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
  const {colors} = useTheme<Theme>();
  const ref = useRef<TextInput>(null);
  const TRANSLATE = MARGIN_VERTICAL + PADDING_VERTICAL + LINE_HEIGHT;
  const focused = useValue<0 | 1>(0);
  const translateY = useValue(TRANSLATE);
  const clock = useClock();
  const isTextArea = props.multiline;
  const color = mixColor(focused, 'rgb(0,0,0)', 'rgb(0,0,0)', 'rgb');

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

  console.log({touched});

  return (
    <View style={containerStyle}>
      {label && (
        <Animated.Text
          style={[
            styles.labelStyle,
            {
              transform: [{translateY: animateLabel ? translateY : 0}],
            },
            labelStyle,
          ]}>
          {label}
        </Animated.Text>
      )}
      <TextInput
        {...props}
        numberOfLines={Platform.OS === 'ios' ? undefined : numberOfLines}
        ref={ref}
        placeholderTextColor={colors.gray}
        style={[
          props.style,
          styles.input,
          {
            minHeight:
              Platform.OS === 'ios' && numberOfLines
                ? LINE_HEIGHT * numberOfLines
                : undefined,
            ...(isTextArea ? {...styles.textarea, paddingLeft: 5} : null),
          },
        ]}
        onFocus={() => focused.setValue(1)}
        onBlur={onBlur}
      />
      {touched && error && (
        <Text style={{fontSize: 12, marginTop: 10, color: '#FF0D10'}}>
          {error}
        </Text>
      )}
    </View>
  );
};

export default TextField;
