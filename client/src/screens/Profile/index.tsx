import React, {useEffect} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useTheme} from '@shopify/restyle';

import {Avatar, LoadingContent} from '../../components';
import ProfileItem from './components/ProfileItem';

import {signOut, getUser} from '../../store/reducers/auth';
import {RootState} from '../../store/reducers';

import theme, {Theme, Text, Box} from '../../theme';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  image: {
    position: 'absolute',
    top: -80,
    alignSelf: 'center',
    borderWidth: 5,
    borderColor: 'white',
    // ...theme.shadows.large,
  },
  subContainer: {
    flex: 0.85,
    overflow: 'visible',
    // marginHorizontal: theme.spacing.l,
    position: 'relative',
  },
  userInfo: {
    paddingVertical: theme.spacing.xxl,
    //   marginHorizontal: theme.spacing.l,
  },
  name: {
    fontSize: theme.fontSizes.titleXl * 1.1,
    fontWeight: '400',
    alignSelf: 'center',
  },
  email: {
    fontSize: theme.fontSizes.titleM,
    alignSelf: 'center',
    color: theme.colors.gray,
  },
  content: {
    width,
    flex: 1,
    overflow: 'visible',
    marginTop: 20,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.xl,
    paddingBottom: 0,
    ...theme.shadows.large,
    borderTopRightRadius: 32,
    borderTopLeftRadius: 32,
  },
  error: {
    alignSelf: 'center',
    fontSize: theme.fontSizes.titleLg,
    color: theme.colors.lightGray,
  },
});

interface ProfileProps {}

const Profile = (props: ProfileProps) => {
  const {colors} = useTheme<Theme>();
  const dispatch = useDispatch();
  const {user, loading, error} = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(getUser());
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.primary}}>
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <Box
            width={width}
            flex={1}
            marginTop="m"
            overflow="visible"
            backgroundColor="background"
            justifyContent={!user ? 'center' : 'flex-end'}
            padding="xl"
            borderTopLeftRadius="xl"
            borderTopRightRadius="xl">
            {error && <Text style={styles.error}>{error}</Text>}
            {loading && <Avatar style={styles.image} size={180} source={{}} />}
            {user && (
              <>
                <Avatar
                  style={styles.image}
                  size={180}
                  source={{
                    uri: `http://192.168.1.8:5000/uploads/${user.avatar}`,
                  }}
                />
                <View style={styles.userInfo}>
                  {user?.firstName && user?.lastName ? (
                    <Text
                      color="foreground"
                      style={
                        styles.name
                      }>{`${user?.firstName} ${user?.lastName}`}</Text>
                  ) : (
                    <Text color="foreground" style={styles.name}>
                      {user.username}
                    </Text>
                  )}
                  <Text style={styles.email}>{user.email}</Text>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                  <ProfileItem
                    title="Edit profile"
                    icon="person-circle"
                    name="EditProfile"
                    color="secondary"
                  />
                  <ProfileItem
                    title="Settings"
                    icon="cog"
                    name="Settings"
                    color="secondary"
                  />
                  <ProfileItem
                    style={{marginTop: 30}}
                    title="Logout"
                    icon="exit"
                    onPress={() => dispatch(signOut())}
                    color="negative"
                  />
                </ScrollView>
              </>
            )}
            {loading && (
              <View style={{marginTop: 160, flex: 1}}>
                <LoadingContent numOfLines={3} />
              </View>
            )}
          </Box>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
