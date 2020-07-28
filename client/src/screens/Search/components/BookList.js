import React from "react";
import { FlatList } from "react-native";

import Book from "./Book";

const BookList = ({ books }) => {
  return (
    <FlatList
      style={{ paddingHorizontal: 10 }}
      data={books}
      renderItem={({ item }) => <Book book={item} />}
      keyExtractor={(book) => book.id}
    />
  );
};

export default BookList;
