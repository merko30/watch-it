import React, {Component} from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';

import {connect, useSelector, useDispatch} from 'react-redux';

import {signOut} from '../store/actions';
import {AppState} from '../store/reducers';

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
});

const Settings = () => {
  const dispatch = useDispatch();

  const user = useSelector((state: AppState) => state.auth.user);

  return (
    <View style={styles.container}>
      {user && (
        <View>{/* <EditField field="name" value={user.name} /> */}</View>
      )}
      <TouchableOpacity onPress={() => dispatch(signOut())}>
        <Text>SIGN OUT</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Settings;
