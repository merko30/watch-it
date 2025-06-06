import React, { useContext } from 'react';
import { View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { useQuery } from 'react-query';
import { AxiosError, AxiosResponse } from 'axios';

import Avatar from '@/components/Avatar';

import { Text, Box } from '@/theme';

import { fetchUser } from '@/api/users';

import { User } from 'types';

import { AuthContext } from '@/providers/AuthProvider';

import ProfileItem from './ProfileItem';
import LoadingContent from './LoadingSkeleton';

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
    marginTop: 20,
  },
});

const Profile = () => {
  const { logOut } = useContext(AuthContext);

  const { data, error, isLoading } = useQuery<
    AxiosResponse<{ user: User }>,
    AxiosError<{ message: string }>
  >({
    queryFn: () => fetchUser(),
    queryKey: 'profile',
  });
  const {
    data: { user },
  } = data ?? { data: {} };

  const displayName =
    user?.firstName && user?.lastName
      ? `${user?.firstName} ${user?.lastName}`
      : user?.username;

  return (
    <Box flex={1}>
      <Box style={styles.container} bg="background">
        {error && (
          <Text alignSelf="center" color="error">
            Failed to load profile information
          </Text>
        )}
        {user && (
          <>
            <Box margin="l" mb={0} p="l" pt="xxl">
              <Avatar
                style={styles.image}
                size={100}
                source={{
                  uri: user.avatar ?? '',
                }}
              />
              <Box alignItems="center">
                <Text color="foreground" variant="header" textAlign="center">
                  {displayName}
                </Text>

                <Text variant="body" color="foreground">
                  {user.email}
                </Text>
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
                color="error"
                style={{ borderBottomWidth: 0 }}
              />
            </ScrollView>
          </>
        )}
        {isLoading && (
          <View style={{ marginTop: 80, flex: 1 }}>
            <Box
              width={100}
              height={100}
              backgroundColor="spacer"
              borderRadius="full"
              alignSelf="center"
              mb="xxl"
            />
            <LoadingContent numOfLines={3} />
          </View>
        )}
      </Box>
    </Box>
  );
};

export default Profile;
