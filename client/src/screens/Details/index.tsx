import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  ImageBackground,
  useWindowDimensions,
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTheme } from '@shopify/restyle';
import Icon from 'react-native-vector-icons/Ionicons';
import { useQuery } from 'react-query';
import { AxiosError, AxiosResponse } from 'axios';

// import {MovieStatus} from 'types/Movie';

import MoviePoster from 'components/MoviePoster';

import { RootStackParamList } from '../../navigation';

import { Theme, Box, Text } from '../../theme';

import { getSingleMovie } from 'api/movies';

import { TMDBMovie } from 'types';

import Description from './Description';
import Info from './Info';

const styles = StyleSheet.create({
  backdrop: { ...StyleSheet.absoluteFillObject, marginTop: 30 },
  poster: { width: 140, height: 200 },
  content: { marginTop: 180, paddingTop: 100 },
});

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

type DetailsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Details'
>;

type DetailsProps = {
  route: DetailsScreenRouteProp;
  navigation: DetailsScreenNavigationProp;
};

const Details = ({
  route: {
    params: { id, type },
  },
  navigation,
}: DetailsProps) => {
  const [showMenu, setShowMenu] = useState(false);

  const { width, height } = useWindowDimensions();
  const { colors, borderRadii, spacing, shadows } = useTheme<Theme>();

  const { data, isLoading, error } = useQuery<
    AxiosResponse<{ volume: TMDBMovie }>,
    AxiosError<{ message: string }>
  >(['movie', { id, type }], () => getSingleMovie({ type, id }));
  const { data: { volume: movie = null } = {} } = data || {};

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Icon
          name="add-circle-outline"
          style={{ marginRight: spacing.m }}
          size={32}
          color={colors.foreground}
          onPress={() => setShowMenu(!showMenu)}
        />
      ),
    });
  }, [colors.foreground, spacing.m, navigation, showMenu]);

  // const onMenuItemPress = (status: MovieStatus | 'delete' | 'info') => {
  //   if (book) {
  //     if (status === 'delete') {
  //       dispatch(deleteBook(book.id));
  //     } else if (status == 'info') {
  //       navigation.navigate('Details', {id: book.id});
  //     } else {
  //       dispatch(
  //         addOrUpdateBook({
  //           title: movie.title,
  //           thumbnail: movie.imageLinks
  //             ? movie.imageLinks.smallThumbnail
  //             : undefined,
  //           authors: movie.authors,
  //           id: book.id,
  //           status,
  //         }),
  //       );
  //     }
  //   }
  // };

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error || !movie) {
    return <Text>{error?.message}</Text>;
  }

  return (
    <Box backgroundColor="backgroundTwo" flex={1}>
      <ImageBackground
        style={{ width, height }}
        resizeMode="cover"
        source={{
          uri: `https://image.tmdb.org/t/p/w780/${movie.backdrop_path}`,
        }}>
        <Box
          height={height}
          justifyContent="flex-start"
          alignItems="center"
          zIndex={5}
          style={styles.backdrop}>
          <MoviePoster
            style={[styles.poster, shadows.medium]}
            ratio={2}
            uri={movie.poster_path}
          />
        </Box>
        <Box
          // backgroundColor="backgroundThree"
          flex={16}
          padding="l"
          borderTopRightRadius="xxl"
          borderTopLeftRadius="xxl"
          style={styles.content}>
          <ScrollView
            contentContainerStyle={{
              borderRadius: borderRadii.m,
              backgroundColor: colors.background,
            }}
            showsVerticalScrollIndicator={false}>
            <Text
              variant="title"
              color="foreground"
              ellipsizeMode="tail"
              numberOfLines={2}>
              {movie.title}
            </Text>

            <Box
              backgroundColor="background"
              borderRadius="m"
              marginTop="m"
              flexDirection="row"
              justifyContent="space-around">
              {movie.vote_average && (
                <Info
                  icon="star"
                  iconColor="gold"
                  label="Rating"
                  text={movie.vote_average}
                />
              )}
            </Box>
            {movie.overview && <Description description={movie.overview} />}
          </ScrollView>
        </Box>
      </ImageBackground>
    </Box>
  );
};

export default Details;
