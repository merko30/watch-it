import React, { useState } from 'react';
import Modal from 'react-native-modal';

import { Box, Text } from '../../theme';

import Checkbox, { Size } from '../../components/Checkbox';
import { TouchableOpacity } from 'react-native';

export interface SettingItem {
  label: string;
  key: string;
}

type SettingProps = {
  label: string;
  onChange: (value: any) => void;
} & (
  | {
      type: 'list';
      items: SettingItem[];
      value: string;
      checked?: never;
    }
  | {
      type: 'checkbox';
      checked: boolean;
      value?: never;
      items?: never;
    }
);

const Setting = ({
  label,
  checked,
  onChange,
  value,
  type,
  items,
}: SettingProps) => {
  const [visible, setVisible] = useState(false);
  return (
    <Box paddingLeft="l">
      <Box
        paddingVertical="s"
        flexDirection="row"
        borderBottomWidth={1}
        borderBottomColor="spacer"
        justifyContent="space-between"
        alignItems="center">
        <Text color="foreground" variant="body">
          {label}
        </Text>
        {type === 'checkbox' && (
          <Checkbox size={Size.MEDIUM} checked={checked!} onChange={onChange} />
        )}
        {type === 'list' && items && (
          <>
            <TouchableOpacity onPress={() => setVisible(!visible)}>
              <Text color="foreground" variant="body">
                {items.find(k => k.key === value)?.label}
              </Text>
            </TouchableOpacity>
            <Modal
              isVisible={visible}
              onBackdropPress={() => setVisible(!visible)}>
              <Box backgroundColor="white" borderRadius="lg">
                {items.map((k, i) => (
                  <TouchableOpacity
                    onPress={() => {
                      onChange(k.key);
                      setVisible(!visible);
                    }}>
                    <Box
                      paddingVertical="m"
                      alignItems="center"
                      borderBottomColor="spacer"
                      borderBottomWidth={i === items.length - 1 ? 0 : 1}>
                      <Text>{k.label}</Text>
                    </Box>
                  </TouchableOpacity>
                ))}
              </Box>
            </Modal>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Setting;
