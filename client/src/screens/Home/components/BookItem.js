import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";

import { deleteBook, addOrUpdateBook } from "../../../store/actions";

import BookMenu from "../../../components/BookMenu";

import { renderAuthors } from "../../../utils";
import Authors from "../../../components/Authors";

const BookItem = ({ item: book }) => {
  const { navigate } = useNavigation();

  const dispatch = useDispatch();

  const onMenuPress = status => {
    if (status === "info") {
      navigate("Details", { id: book.bookId });
    } else if (status === "delete") {
      dispatch(deleteBook(book.bookId));
    } else if (status === "reading" || "read" || "wishlist") {
      dispatch(addOrUpdateBook({ ...book, status }));
    }
  };

  return (
    <View>
      <View style={styles.outer}>
        <View style={styles.itemStyle}>
          <Text style={styles.titleStyle}>{book.title}</Text>
          <Authors
            textStyle={styles.author}
            authors={book.authors}
            numberOfLines={1}
          />
        </View>
        <BookMenu
          showInfoItem={true}
          key={book.bookId}
          bookId={book.bookId}
          onPress={onMenuPress}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 0.7,
    borderBottomColor: "#ededed",
    margin: 1,
    flex: 1,
    padding: 8
  },
  author: {
    fontSize: 14
  },
  titleStyle: {
    fontSize: 18,
    textTransform: "uppercase"
  }
});

export default BookItem;
