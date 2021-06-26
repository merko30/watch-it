import React, {useState, useCallback} from 'react';
import {StyleSheet, View, ScrollView, SafeAreaView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  TapGestureHandler,
  TapGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedScrollHandler,
  useSharedValue,
  useDerivedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {ReText} from 'react-native-redash';
import useDeepCompareEffect from 'use-deep-compare-effect';
import {useFocusEffect} from '@react-navigation/native';
import {useTheme} from '@shopify/restyle';

import {getBooks} from '../../store/reducers/books';
import {RootState} from 'src/store/reducers';

import Bookshelf from './components/Bookshelf';

import theme, {Theme, Text, Box} from '../../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  scene: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  row: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: theme.fontSizes.textLg,
    textTransform: 'uppercase',
  },
  showAll: {
    padding: 5,
    borderRadius: theme.borderRadii.s,
  },
});

const SHELVES = [
  {
    name: 'wishlist',
    title: 'Wishlist',
    backgroundColor: 'orange',
  },
  {
    name: 'reading',
    title: 'Reading',
    backgroundColor: 'chocolate',
  },
  {
    name: 'read',
    title: 'Read',
    backgroundColor: 'brown',
  },
];

const Home = () => {
  const [shelves] = useState(SHELVES);
  const {colors} = useTheme<Theme>();
  const dispatch = useDispatch();

  const {books} = useSelector((state: RootState) => state.books);

  useFocusEffect(
    useCallback(() => {
      dispatch(getBooks({}));
    }, []),
  );

  useDeepCompareEffect(() => {}, [books]);

  const y = useSharedValue(0);
  const showAll = useSharedValue(0);

  const marginTop = useDerivedValue(() => {
    return showAll.value === 1 ? 0 : -20;
  });

  const gestureHandler = useAnimatedGestureHandler<TapGestureHandlerGestureEvent>(
    {
      onStart: (e, ctx) => {
        showAll.value = showAll.value ? 0 : 1;
      },
    },
  );

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      y.value = e.contentOffset.y;
    },
  });

  const text = useDerivedValue(() => {
    return showAll.value === 1 ? 'See less' : 'See more';
  }, [showAll]);

  const style = useAnimatedStyle(() => ({
    marginTop: marginTop.value,
  }));

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.background}}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{flex: 1}}
        showsVerticalScrollIndicator={false}
        bounces={false}>
        <View style={styles.row}>
          <Text color="foreground" variant="body" style={styles.title}>
            Your bookshelves
          </Text>
          <TapGestureHandler onHandlerStateChange={gestureHandler}>
            <Animated.View>
              <Box backgroundColor="lightGray" p="xs" borderRadius="s">
                <ReText text={text} style={{color: colors.gray, padding: 0}} />
              </Box>
            </Animated.View>
          </TapGestureHandler>
        </View>
        <Animated.ScrollView
          showsVerticalScrollIndicator={false}
          style={style}
          scrollEventThrottle={16}
          {...scrollHandler}>
          {shelves.map((shelf, i) => {
            const last = i === shelves.length - 1;
            return (
              <Bookshelf
                index={i}
                showAll={showAll}
                last={last}
                y={y}
                books={books.filter((b) => b.status == shelf.name)}
                {...shelf}
                key={shelf.name}
              />
            );
          })}
        </Animated.ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
