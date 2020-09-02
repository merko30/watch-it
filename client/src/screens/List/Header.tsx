import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';

import BackIcon from '../../components/BackIcon';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    position: 'relative',
    alignItems: 'center',
    height: 120,
    flexDirection: 'row',
  },
  title: {
    fontSize: 24,
    flex: 1,
    textAlign: 'center',
  },
});

interface HeaderProps {
  title: string;
  backgroundColor: string;
  showBackIcon: boolean;
}

const Header = ({title, backgroundColor, showBackIcon}: HeaderProps) => {
  const {top} = useSafeAreaInsets();
  const navigation = useNavigation();
  return (
    <View
      style={[
        styles.container,
        {backgroundColor, borderBottomLeftRadius: 25, paddingTop: top},
      ]}>
      <BackIcon style={{flex: 1}} onPress={() => navigation.goBack()} />
      <Text style={styles.title}>{title.toUpperCase()}</Text>
      <View style={{flex: 1}} />
    </View>
  );
};

export default Header;
