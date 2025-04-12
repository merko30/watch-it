import React, { useContext } from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import { useQuery } from 'react-query';
import { AxiosError, AxiosResponse } from 'axios';

import Avatar from '@/components/Avatar';
import LoadingContent from '@/components/LoadingContent';

import ProfileItem from './ProfileItem';

import { Text, Box } from '@/theme';

import { fetchUser } from '@/api/users';

import { User } from 'types';

import { AuthContext } from '@/providers/AuthProvider';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#333',
    alignSelf: 'center',
    marginBottom: 10,
  },
  content: {
    width: width - 30,
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: 20,
    overflow: 'visible',
    backgroundColor: '#fff',
  },
});

const Profile = () => {
  const { logOut } = useContext(AuthContext);

  const { data, error, isLoading } = useQuery<
    AxiosResponse<{ user: User }>,
    AxiosError<{ message: string }>
  >({
    queryFn: () => fetchUser(),
  });
  const {
    data: { user },
  } = data ?? { data: {} };

  const displayName =
    user?.firstName && user?.lastName
      ? `${user?.firstName} ${user?.lastName}`
      : user?.username;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        {error && (
          <Text alignSelf="center" color="negative">
            Failed to load profile information
          </Text>
        )}
        {user && (
          <>
            <Box margin="l" mb={0} p="l">
              <Avatar
                style={styles.image}
                size={100}
                source={{
                  uri: `http://192.168.1.8:5000/uploads/${user.avatar}`,
                }}
              />
              <Box alignItems="center">
                <Text color="foreground" variant="header">
                  {displayName}
                </Text>

                <Text variant="body">{user.email}</Text>
              </Box>
            </Box>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.content}>
              <ProfileItem
                title="Edit profile"
                icon="person-circle"
                name="EditProfile"
              />
              <ProfileItem title="Settings" icon="cog" name="Settings" />
              <ProfileItem
                title="Logout"
                icon="exit"
                onPress={() => logOut()}
                color="negative"
              />
            </ScrollView>
          </>
        )}
        {isLoading && (
          <View style={{ marginTop: 160, flex: 1 }}>
            <LoadingContent numOfLines={3} />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Profile;
