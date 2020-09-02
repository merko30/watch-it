import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useTheme} from '@shopify/restyle';
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

import {deleteBook, getBooks} from '../../store/reducers/books';

import Bookshelf from './components/Bookshelf';
import {RootState} from 'src/store/reducers';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  scene: {
    flex: 1,
    backgroundColor: 'white',
  },
  row: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    textTransform: 'uppercase',
  },
  showAll: {backgroundColor: 'rgba(0,0,0,0.2)', padding: 5, borderRadius: 5},
});

const SHELVES = [
  {
    name: 'wishlist',
    title: 'Wishlist',
    backgroundColor: 'gold',
  },
  {
    name: 'reading',
    title: 'Reading',
    backgroundColor: 'orange',
  },
  {
    name: 'read',
    title: 'Read',
    backgroundColor: 'brown',
  },
];

const Home = () => {
  const [shelves] = useState(SHELVES);
  const [text, setText] = useState('Show all');
  const dispatch = useDispatch();

  const {books, loading} = useSelector(
    ({books: {loading, books}}: RootState) => ({
      books,
      loading,
    }),
  );

  useEffect(() => {
    dispatch(getBooks({}));
  }, []);

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
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{flex: 1}}
        showsVerticalScrollIndicator={false}
        bounces={false}>
        <View style={styles.row}>
          <Text style={styles.title}>Your bookshelves</Text>
          <TapGestureHandler {...gestureHandler}>
            <Animated.View style={styles.showAll}>
              <Text>{text}</Text>
            </Animated.View>
          </TapGestureHandler>
        </View>
        <Animated.ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            marginTop,
          }}
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
