import React from 'react';
// {useEffect, useState}
import { ActivityIndicator } from 'react-native';

import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
// import {useTheme} from '@shopify/restyle';
// import Icon from 'react-native-vector-icons/Ionicons';
// import LinearGradient from 'react-native-linear-gradient';
// import {useQuery} from 'react-query';

// import {BookMenu, Info, Description} from './components';

// import {MovieStatus} from 'types/Movie';

import { RootStackParamList } from '../../navigation';

import {
  // theme,
  // Theme,
  // Box,
  Text,
  // Text
} from '../../theme';
import { useQuery } from 'react-query';
import { getSingleMovie } from 'api/movies';
import { AxiosResponse } from 'axios';
import { TMDBMovie } from 'types';
// import {BookCover} from '../../components';

// const styles = StyleSheet.create({
//   cover: {
//     borderRadius: theme.borderRadii.m,
//     shadowOffset: {
//       width: 0,
//       height: 3,
//     },
//     shadowOpacity: 0.27,
//     shadowRadius: 4.65,
//   },
// });

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
}: DetailsProps) => {
  // const [showMenu, setShowMenu] = useState(false);

  // const {spacing, colors, borderRadii} = useTheme<Theme>();
  // // const { } = useQuery({})

  const { data, isLoading, error } = useQuery<
    AxiosResponse<{ movie: TMDBMovie }>
  >(['movie', { id, type }], () => getSingleMovie({ type, id }));

  const { data: { movie = null } = {} } = data || {};

  // useEffect(() => {
  //   navigation.setOptions({
  //     headerRight: () => (
  //       <Icon
  //         name="add-circle-outline"
  //         style={{marginRight: spacing.m}}
  //         size={32}
  //         color={colors.foreground}
  //         onPress={() => setShowMenu(!showMenu)}
  //       />
  //     ),
  //   });
  //   dispatch(getBook(id));
  // }, [id]);

  // const onMenuItemPress = (status: MovieStatus | 'delete' | 'info') => {
  //   if (book) {
  //     if (status === 'delete') {
  //       dispatch(deleteBook(book.id));
  //     } else if (status == 'info') {
  //       navigation.navigate('Details', {id: book.id});
  //     } else {
  //       dispatch(
  //         addOrUpdateBook({
  //           title: book.volumeInfo.title,
  //           thumbnail: book.volumeInfo.imageLinks
  //             ? book.volumeInfo.imageLinks.smallThumbnail
  //             : undefined,
  //           authors: book.volumeInfo.authors,
  //           id: book.id,
  //           status,
  //         }),
  //       );
  //     }
  //   }
  // };

  // const image =
  //   (book &&
  //     book.volumeInfo.imageLinks &&
  //     book.volumeInfo.imageLinks.thumbnail) ??
  //   '';

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error || !movie) {
    return <Text>error</Text>;
  }

  return <Text>{movie.title}</Text>;

  // book ? (
  //   <Box backgroundColor="backgroundTwo" flex={1}>
  //     <LinearGradient
  //       colors={[colors.backgroundThree, colors.backgroundTwo]}
  //       style={{flexGrow: 1, paddingTop: spacing.l}}>
  //       <BookMenu
  //         toggleVisible={() => setShowMenu(!showMenu)}
  //         visible={showMenu}
  //         bookId={book.id}
  //         onPress={onMenuItemPress}
  //       />
  //       <BookCover
  //         style={[
  //           styles.cover,
  //           {
  //             shadowColor: colors.foreground,
  //           },
  //         ]}
  //         ratio={1.4}
  //         uri={image}
  //       />
  //     </LinearGradient>
  //     <Box
  //       backgroundColor="background"
  //       flex={16}
  //       padding="xl"
  //       borderTopRightRadius="xxl"
  //       borderTopLeftRadius="xxl">
  //       <ScrollView
  //         contentContainerStyle={{
  //           borderRadius: borderRadii.m,
  //           backgroundColor: colors.background,
  //         }}
  //         style={{flexGrow: 2}}
  //         showsVerticalScrollIndicator={false}>
  //         <Text
  //           variant="title"
  //           color="foreground"
  //           ellipsizeMode="tail"
  //           numberOfLines={2}>
  //           {book.volumeInfo.title}
  //         </Text>
  //         {book.volumeInfo.authors &&
  //           book.volumeInfo.authors.map(author => {
  //             return (
  //               <Text variant="subTitle" color="foregroundTwo" key={author}>
  //                 {author}
  //               </Text>
  //             );
  //           })}
  //         <Box
  //           backgroundColor="backgroundTwo"
  //           borderRadius="m"
  //           marginTop="m"
  //           flexDirection="row"
  //           justifyContent="space-around">
  //           {book.volumeInfo.averageRating && (
  //             <Info
  //               icon="star"
  //               iconColor="gold"
  //               label="Rating"
  //               text={book.volumeInfo.averageRating}
  //             />
  //           )}
  //           {book.volumeInfo.pagesCount && (
  //             <Info
  //               icon="book-outline"
  //               iconColor="foreground"
  //               label="Pages"
  //               text={book.volumeInfo.pagesCount}
  //             />
  //           )}
  //         </Box>
  //         {book.volumeInfo.description && (
  //           <Description description={book.volumeInfo.description} />
  //         )}
  //       </ScrollView>
  //     </Box>
  //   </Box>
  // ) : (
  //   <Box flex={1} justifyContent="center" backgroundColor="backgroundTwo">
  //     <ActivityIndicator color={colors.foreground} size="large" />
  //   </Box>
  // );
};

export default Details;
