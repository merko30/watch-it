import React, { useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useFormik } from 'formik';
import { SafeAreaView } from 'react-native';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { Notifier } from 'react-native-notifier';

import { TextField, RoundedIcon, Avatar, Button } from '@/components';

import { Box } from '@/theme';
import { fetchUser, updateAvatar, updateUser } from '@/api/users';
import { User } from '@/types';
import pickImage from '@/utils/pickImage';

interface InitialState {
  firstName: string;
  lastName: string;
  username: string;
  about: string;
  email: string;
}

const EditProfile = () => {
  const [initialValues, setInitialValues] = useState<InitialState>({
    firstName: '',
    lastName: '',
    username: '',
    about: '',
    email: '',
  });

  const { data } = useQuery({
    queryKey: ['profile'],
    queryFn: fetchUser,
    onSuccess: ({ data }) => {
      setInitialValues(old => {
        let newState = { ...old };
        Object.keys(old || {}).forEach((key: string) => {
          if (data.user[key as keyof User]) {
            newState[key as keyof InitialState] =
              data.user[key as keyof User] || '';
          }
        });

        return newState;
      });
    },
  });

  const client = useQueryClient();

  const onUpdateUser = (
    data: AxiosResponse<{
      message: string;
      user: User;
    }>,
  ) => {
    client.setQueryData(['profile'], (old?: AxiosResponse<{ user: User }>) => {
      if (!old) {
        return data;
      }

      return {
        ...old,
        data: {
          ...old.data,
          user: {
            ...old.data.user,
            ...data.data.user,
          },
        },
      };
    });
  };

  const { mutate } = useMutation({
    mutationFn: updateUser,
    mutationKey: 'updateUser',
    onSuccess: data => {
      Notifier.showNotification({
        title: 'Profile updated',
        description: 'Your profile has been updated successfully',
      });
      onUpdateUser(data);
    },
  });

  const { mutate: updateAvatarMutation } = useMutation({
    mutationFn: updateAvatar,
    mutationKey: 'updateAvatar',
    onSuccess: data => {
      Notifier.showNotification({
        title: 'Avatar updated',
        description: 'Your avatar has been updated successfully',
      });
      onUpdateUser(data);
    },
    onError: (error: AxiosError) => {
      console.log(error.response?.data);

      Notifier.showNotification({
        title: 'Error',
        description: 'Failed to update avatar',
      });
    },
  });

  const { values, handleBlur, handleChange, errors, touched, handleSubmit } =
    useFormik({
      initialValues,
      enableReinitialize: true,
      onSubmit: values => mutate(values as User),
      validate: values => {
        const errors: Record<string, string> = {};

        if (values.firstName && values.firstName.length <= 3) {
          errors.firstName = 'First name must be at least 3 characters long';
        }

        if (values.lastName && values.lastName.length <= 3) {
          errors.lastName = 'Last name must be at least 3 characters long';
        }

        return errors;
      },
    });

  const onChangeAvatar = async () => {
    pickImage('Select an image', async file => {
      console.log(file.uri);

      const formData = new FormData();
      formData.append('avatar', file);

      updateAvatarMutation(formData);
    });
  };

  const avatar = data?.data.user.avatar;
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAwareScrollView
        style={{ flex: 1, backgroundColor: 'white', paddingTop: 20 }}
        contentContainerStyle={{ flex: 1 }}>
        <Box flex={1} backgroundColor="background" alignItems="center">
          {!avatar ? (
            <RoundedIcon
              icon="camera"
              size={120}
              color="foreground"
              style={{ borderWidth: 1, borderColor: 'spacer' }}
              onPress={onChangeAvatar}
            />
          ) : (
            <Avatar
              size={120}
              source={{ uri: avatar }}
              onPress={onChangeAvatar}
            />
          )}
          <Box
            flex={1}
            width="100%"
            alignSelf="flex-start"
            paddingHorizontal="m">
            {/* {error && <Message variant="error" message={error} />}
          {message && <Message variant="success" message={message} />} */}
            {/* <KeyboardAvoidingView
                behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
                style={{flex: 1, backgroundColor: 'red'}}> */}
            <TextField
              containerStyle={{ marginBottom: 10 }}
              onChangeText={handleChange('firstName')}
              onBlur={handleBlur('firstName')}
              error={errors['firstName']}
              touched={touched['firstName']}
              name="firstName"
              label="First name"
              value={values.firstName!}
            />
            <TextField
              containerStyle={{ marginBottom: 20 }}
              onChangeText={handleChange('lastName')}
              onBlur={handleBlur('lastName')}
              error={errors['lastName']}
              touched={touched['lastName']}
              name="lastName"
              label="Last name"
              value={values.lastName!}
            />

            <Button
              onPress={handleSubmit}
              label="Save changes"
              color="primary"
            />
          </Box>
        </Box>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default EditProfile;
