import React, {useRef, useEffect, useState} from 'react';
import {View, StyleSheet, StyleProp, ViewStyle} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';

import theme from '../theme';

const MARGIN = 5;

const styles = StyleSheet.create({
  container: {flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center'},
  field: {
    borderRadius: theme.borderRadii.s,
    height: 60,
    width: 40,
    backgroundColor: 'lightblue',
    margin: MARGIN,
    textAlign: 'center',
    fontSize: 24,
  },
});

type CodeProps = {
  length: number;
  fieldStyle?: StyleProp<ViewStyle>;
} & (
  | {
      onFilled: (code: string) => void;
      autoVerification: boolean;
      onChange?: never;
    }
  | {
      onFilled?: never;
      autoVerification: never;
      onChange?: (code: string) => void;
    }
);

const Code = ({
  length,
  onFilled,
  autoVerification,
  fieldStyle,
  onChange,
}: CodeProps) => {
  const [width, setWidth] = useState(0);
  const [code, setCode] = useState('');
  const refs = new Array(length).fill(0).map((x) => useRef<any>(null));

  const onChangeCode = (text: string, i: number) => {
    setCode((prevCode) => {
      if (prevCode[i]) {
        return prevCode.substr(0, i) + text + prevCode.substr(i + text.length);
      } else {
        return `${prevCode}${text}`;
      }
    });

    if (text.length > 0) {
      if (i !== refs.length - 1) {
        refs[i + 1].current.focus();
      }
    }
    if (onChange) {
      onChange(code);
    }
  };

  useEffect(() => {
    if (onFilled && code.length === length) {
      onFilled(code);
    }
  }, [code]);

  return (
    <View
      style={styles.container}
      onLayout={(e) =>
        setWidth(e.nativeEvent.layout.width / length - MARGIN * 2)
      }>
      {refs.map((c, i) => {
        return (
          <TextInput
            keyboardType="number-pad"
            ref={refs[i]}
            maxLength={1}
            onChangeText={(text) => onChangeCode(text, i)}
            key={i}
            style={[
              styles.field,
              {minWidth: 42, maxWidth: 51, width},
              fieldStyle,
            ]}
          />
        );
      })}
    </View>
  );
};

export default Code;
