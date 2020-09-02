import React, {useEffect} from 'react';
import {
  Text,
  SafeAreaView,
  View,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useTheme} from '@shopify/restyle';
import {useNavigation} from '@react-navigation/native';

import ProfileItem from './components/ProfileItem';

import {signOut, getUser} from '../../store/reducers/auth';
import {RootState} from '../../store/reducers';

import theme, {Theme} from '../../theme';

import {avatar} from '../../images';

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
    width: 160,
    height: 160,
    borderRadius: 80,
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
    fontSize: theme.fontSizes.titleLg * 1.1,
    fontWeight: '400',
    alignSelf: 'center',
  },
  email: {
    fontSize: theme.fontSizes.subTitle,
    alignSelf: 'center',
    color: theme.colors.gray,
  },
  content: {
    width,
    flex: 1,
    overflow: 'visible',
    marginTop: 20,
    backgroundColor: 'white',
    padding: theme.spacing.xl,
    paddingBottom: 0,
    ...theme.shadows.large,
    borderTopRightRadius: 32,
    borderTopLeftRadius: 32,
  },
  error: {
    alignSelf: 'center',
    fontSize: theme.fontSizes.title,
    color: theme.colors.lightGray,
  },
});

interface ProfileProps {}

const Profile = () => {
  const {colors, fontSizes} = useTheme<Theme>();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {user, loading, error} = useSelector(
    ({auth: {user, loading, error}}: RootState) => ({
      user,
      loading,
      error,
    }),
  );

  useEffect(() => {
    dispatch(getUser());
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.light}}>
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <View
            style={[
              styles.content,
              {justifyContent: !user ? 'center' : 'flex-end'},
            ]}>
            {error && <Text style={styles.error}>{error}</Text>}
            {user && (
              <>
                <Image
                  style={styles.image}
                  source={
                    user.avatar
                      ? {uri: `http://192.168.1.8:5000/uploads/${user.avatar}`}
                      : avatar
                  }
                />
                <View style={styles.userInfo}>
                  {user?.firstName && user?.lastName ? (
                    <Text
                      style={
                        styles.name
                      }>{`${user?.firstName} ${user?.lastName}`}</Text>
                  ) : (
                    <Text style={styles.name}>{user.username}</Text>
                  )}
                  <Text style={styles.email}>{user.email}</Text>
                </View>
                <ScrollView>
                  <ProfileItem
                    title="Edit profile"
                    icon="person-circle"
                    name="EditProfile"
                    color={colors.secondary}
                  />
                  <ProfileItem
                    title="Statistics"
                    icon="stats-chart"
                    name="Stats"
                    color={colors.secondary}
                  />
                  <ProfileItem
                    title="Security settings"
                    icon="cog"
                    name="Security"
                    color={colors.secondary}
                  />
                  <ProfileItem
                    style={{marginTop: 30}}
                    title="Logout"
                    icon="exit"
                    onPress={() => dispatch(signOut())}
                    color={colors.negative}
                  />
                </ScrollView>
              </>
            )}
            {loading && <ActivityIndicator size={'large'} />}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
