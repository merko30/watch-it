import React from 'react';
import {
  View,
  ColorValue,
  // StyleSheet,
  // FlatList,
  // TouchableOpacity,
} from 'react-native';
import Animated from 'react-native-reanimated';
// {
//   useValue,
//   set,
//   not,
//   Extrapolate,
//   useAnimatedGestureHandler,
//   interpolateNode,
//   useAnimatedStyle,
//   useDerivedValue,
//   useSharedValue,
//   interpolate,
//   withSpring,
// } from 'react-native-reanimated';
// import {
//   TapGestureHandler,
//   TapGestureHandlerStateChangeEvent,
// } from 'react-native-gesture-handler';
// import {useNavigation} from '@react-navigation/native';

// import {Movie} from 'types/Movie';

// // import MoviePose from '../../../components/MoviePoster';

// import theme, {Text} from '../../../theme';

export const BOOKSHELF_HEIGHT = 320;
export const TITLE_HEIGHT = 35;

// const styles =

interface BookshelfProps {
  movies: any[];
  title: string;
  backgroundColor: ColorValue;
  name: string;
  showAll: Animated.SharedValue<number>;
  index: number;
  last: boolean;
  y: Animated.SharedValue<number>;
}

// const INACTIVE_MARGIN = -BOOKSHELF_HEIGHT + 25;

const Bookshelf = ({}: // title,
// backgroundColor,
// showAll,
// index,
// books,
// last,
// name,
// y,
BookshelfProps) => {
  // const [snapToInterval, setSnapToInterval] = useState(0);
  // const [booksArray, setBooksArray] = useState<Book[][]>([]);
  // const navigation = useNavigation();
  // const [gestureHandleActive, setGestureHandlerActive] = useState(true);
  // const open = useSharedValue(0);

  // const gestureHandler = useAnimatedGestureHandler<TapGestureHandlerStateChangeEvent>(
  //   {
  //     onStart: () => {
  //       open.value = open.value ? withSpring(0) : withSpring(1);
  //     },
  //   },
  // );

  // const translateYInterpolation = interpolate(
  //   y.value,
  //   [0, 1],
  //   [0, -0.2 * index],
  //   Extrapolate.CLAMP,
  // );

  // const scaleInterpolation = interpolate(
  //   index,
  //   [0, 1, 2],
  //   [0.8, 0.9, 1],
  //   Extrapolate.CLAMP,
  // );

  // useEffect(() => {
  //   setBooksArray(handleBooks(books));
  // }, [books.length]);

  // const translateY = useDerivedValue(() => {
  //   return showAll.value === 1
  //     ? withSpring(0)
  //     : withSpring(translateYInterpolation);
  // });

  // const scale = useDerivedValue(() => {
  //   return showAll.value === 1 ? withSpring(1) : withSpring(scaleInterpolation);
  // });

  // const marginBottom = useDerivedValue(() => {
  //   const marginBottomInterpolation = interpolate(
  //     open.value,
  //     [0, 1],
  //     [-BOOKSHELF_HEIGHT + TITLE_HEIGHT, 5],
  //     Extrapolate.CLAMP,
  //   );
  //   return showAll.value === 1 ? marginBottomInterpolation : INACTIVE_MARGIN;
  // }, [open.value, showAll.value]);

  // useEffect(() => {
  //   setGestureHandlerActive(!!showAll.value);
  // },[showAll]);

  // const renderBook = (item: Book[]) => {
  //   return (
  //     <View style={{alignSelf: 'flex-start'}}>
  //       {item[0] && (
  //         <View key={item[0]._id} style={styles.image}>
  //           <BookCover uri={item[0].thumbnail!} />
  //         </View>
  //       )}
  //       {item[1] && (
  //         <View key={item[1]._id} style={styles.image}>
  //           <BookCover uri={item[1].thumbnail!} />
  //         </View>
  //       )}
  //     </View>
  //   );
  // };

  // const handleBooks = (books: Book[]) => {
  //   const bookArrays: Book[][] = [];

  //   for (var i = 0; i < books.length; i += 2) {
  //     bookArrays.push(books.slice(i, i + 2));
  //   }
  //   return bookArrays;
  // };

  // const style = useAnimatedStyle(() => ({
  //   backgroundColor,
  //   marginBottom: !last ? marginBottom.value : 0,
  //   transform: [{scale: scale.value}, {translateY: translateY.value}],
  // }));

  return (
    // <Animated.View style={[styles.container, style]}>
    //   <View style={styles.row}>
    //     <TapGestureHandler
    //       onHandlerStateChange={gestureHandler}
    //       // enabled={gestureHandleActive}
    //     >
    //       <Animated.View>
    //         <Text color="foreground" variant="body" style={styles.title}>
    //           {title}
    //         </Text>
    //       </Animated.View>
    //     </TapGestureHandler>
    //     <TouchableOpacity
    //       onPress={() => navigation.navigate('List', {shelf: name})}>
    //       <Text color="foreground" variant="body">
    //         Show all books
    //       </Text>
    //     </TouchableOpacity>
    //   </View>
    //   <FlatList
    //     onLayout={(e) => setSnapToInterval(e.nativeEvent.layout.width)}
    //     data={booksArray}
    //     keyExtractor={(item) => item.map((i) => i._id).join('')}
    //     horizontal
    //     // style={{flex: 1}}
    //     snapToInterval={snapToInterval}
    //     contentContainerStyle={{
    //       width: snapToInterval * (booksArray.length / 3),
    //       justifyContent: 'space-evenly',
    //     }}
    //     decelerationRate="fast"
    //     scrollEventThrottle={1}
    //     renderItem={({item}) => renderBook(item)}
    //   />
    // </Animated.View>
    <View></View>
  );
};

export default Bookshelf;
