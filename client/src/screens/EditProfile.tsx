import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity, Text, Alert} from 'react-native';
import {useTheme} from '@shopify/restyle';
import {useSelector, useDispatch} from 'react-redux';
import {Formik, useFormik} from 'formik';
import Icon from 'react-native-vector-icons/Ionicons';
import {StackScreenProps} from '@react-navigation/stack';

import {TextField, RoundedIcon, Message, Avatar} from '../components';

import {RootState} from '../store/reducers';
import {changeAvatar, updateUser} from '../store/reducers/auth';

import theme, {Theme} from '../theme';

import {User} from '../types';

import pickImage from '../utils/pickImage';

// const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingVertical: theme.spacing.xl,
  },
  changeAvatar: {
    marginVertical: theme.spacing.s,
  },
});

interface EditProfileProps {}

const EditProfile = ({
  navigation,
}: EditProfileProps & StackScreenProps<any, 'EditProfile'>) => {
  const [initValues, setInitialValues] = useState({
    firstName: '',
    lastName: '',
    username: '',
    about: '',
    email: '',
  });
  const dispatch = useDispatch();
  const {user, loading, error, message} = useSelector(
    (state: RootState) => state.auth,
  );
  const {colors, spacing, fontSizes} = useTheme<Theme>();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Icon
          name="checkmark"
          style={{marginRight: spacing.m}}
          onPress={handleSubmit}
          size={32}
        />
      ),
    });
  }, []);

  useEffect(() => {
    if (user) {
      Object.entries(initValues).map(([key, value]) => {
        if (user[key as keyof User]) {
          setInitialValues((old) => ({...old, [key]: user[key as keyof User]}));
        }
      });
    }
  }, [user]);

  const onSubmit = () => {
    dispatch(updateUser(values));
  };

  const {
    values,
    handleBlur,
    handleChange,
    errors,
    touched,
    handleSubmit,
  } = useFormik({
    initialValues: initValues,
    enableReinitialize: true,
    onSubmit,
  });

  return (
    <View style={styles.container}>
      {!user!.avatar ? (
        <RoundedIcon icon="camera" size={64} color={colors.secondary} />
      ) : (
        <Avatar
          size={72}
          source={{uri: `http://192.168.1.8:5000/uploads/${user!.avatar}`}}
        />
      )}
      <TouchableOpacity
        onPress={() =>
          pickImage('Select your profile photo', (p) => {
            dispatch(changeAvatar(p));
          })
        }>
        <Text style={styles.changeAvatar}>Change avatar</Text>
      </TouchableOpacity>
      <View
        style={{
          flex: 1,
          width: '100%',
          marginVertical: spacing.xl,
          alignSelf: 'flex-start',
          paddingHorizontal: spacing.m,
        }}>
        {error && <Message variant="negative" message={error} />}
        {message && <Message variant="positive" message={message} />}
        {/* <KeyboardAvoidingView
                behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
                style={{flex: 1, backgroundColor: 'red'}}> */}
        <TextField
          containerStyle={{marginVertical: 10}}
          onChangeText={handleChange('firstName')}
          onBlur={handleBlur('firstName')}
          error={errors['firstName']}
          touched={touched['firstName']}
          label="First name"
          value={values.firstName!}
        />
        <TextField
          containerStyle={{marginVertical: 10}}
          onChangeText={handleChange('lastName')}
          onBlur={handleBlur('lastName')}
          error={errors['lastName']}
          touched={touched['lastName']}
          label="Last name"
          value={values.lastName!}
        />

        <TextField
          containerStyle={{marginVertical: 10}}
          onChangeText={handleChange('email')}
          onBlur={handleBlur('email')}
          error={errors['email']}
          touched={touched['email']}
          label="Email"
          value={values.email!}
        />

        <TextField
          containerStyle={{marginVertical: 10}}
          onChangeText={handleChange('about')}
          onBlur={handleBlur('about')}
          error={errors['about']}
          touched={touched['about']}
          label="About"
          value={values.about!}
          placeholder="Share few things about yourself"
          animateLabel={false}
          numberOfLines={5}
          multiline={true}
        />

        {/* </KeyboardAvoidingView> */}
      </View>
    </View>
  );
};

export default EditProfile;
