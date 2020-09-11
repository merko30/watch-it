import React, {useState, useCallback} from 'react';
import {StyleSheet, View, ScrollView, SafeAreaView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {State, TapGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  useCode,
  useValue,
  set,
  cond,
  eq,
  not,
  onChange,
  call,
} from 'react-native-reanimated';
import {
  onGestureEvent,
  withTransition,
  onScrollEvent,
} from 'react-native-redash';
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
  const [text, setText] = useState('Show all');
  const dispatch = useDispatch();

  const {books} = useSelector((state: RootState) => state.books);

  useFocusEffect(
    useCallback(() => {
      dispatch(getBooks({}));
    }, []),
  );

  useDeepCompareEffect(() => {}, [books]);

  const showAll = useValue<0 | 1>(0);
  const state = useValue(State.UNDETERMINED);
  const gestureHandler = onGestureEvent({state});
  const mt = useValue(0);
  const marginTop = withTransition(mt);
  const y = useValue(0);

  useCode(
    () => [
      cond(eq(state, State.END), [set(showAll, not(showAll))]),
      cond(eq(showAll, 0), set(mt, -20)),
      cond(eq(showAll, 1), set(mt, 0)),
      onChange(
        showAll,
        call([showAll], ([showAll]) => {
          if (showAll) {
            setText('Show less');
          } else {
            setText('Show all');
          }
        }),
      ),
    ],
    [showAll, state],
  );

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
          <TapGestureHandler {...gestureHandler}>
            <Animated.View>
              <Box backgroundColor="lightGray" padding="s" borderRadius="s">
                <Text color="gray" variant="body">
                  {text}
                </Text>
              </Box>
            </Animated.View>
          </TapGestureHandler>
        </View>
        <Animated.ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            marginTop,
          }}
          scrollEventThrottle={16}
          onScroll={onScrollEvent({y})}>
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
