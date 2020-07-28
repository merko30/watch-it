import React from "react";
import {
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { Text, Icon } from "native-base";
import { useNavigation } from "@react-navigation/native";

import Authors from "../../../components/Authors";

import { COLORS } from "../../../theme/colors";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    marginVertical: 20
  },
  imageContainer: {
    height: 180,
    width: width * 0.3,
    padding: 2,
    borderColor: COLORS.lightBrown,
    borderWidth: 1
  }
});

const Book = ({ book }) => {
  const { navigate } = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {book.volumeInfo.imageLinks && (
          <Image
            source={{
              uri: book.volumeInfo.imageLinks.smallThumbnail
            }}
            style={{ width: "100%", height: "100%" }}
            resizeMode="contain"
          />
        )}
      </View>
      <View style={{ flex: 1, marginLeft: 10 }}>
        <View
          style={{
            flexDirection: "row"
          }}
        >
          {book.volumeInfo.title && (
            <Text
              style={{ color: COLORS.darkBrown, fontSize: 18 }}
              numberOfLines={2}
            >
              {book.volumeInfo.title}
            </Text>
          )}
        </View>
        <View>
          {book.volumeInfo.authors && (
            <Authors numberOfLines={2} authors={book.volumeInfo.authors} />
          )}
          {book.volumeInfo.categories &&
            book.volumeInfo.categories.map(category => {
              return (
                <Text key={category} style={{}}>
                  {category}
                </Text>
              );
            })}
          {book.volumeInfo.averageRating && (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon name="star" type="Entypo" />
              <Text style={{ margin: 5 }}>{book.volumeInfo.averageRating}</Text>
            </View>
          )}
          <TouchableOpacity>
            <Text
              style={{
                color: "#1793f6"
              }}
              onPress={() => navigate("Details", { id: book.id })}
            >
              See more
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Book;
