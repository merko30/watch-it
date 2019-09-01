import React from "react";

import { ScrollView, View, StyleSheet, Text } from "react-native";

import Book from "./Book";

const BookList = ({ books }) => {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View style={{ flex: 1 }}>
          {books &&
            books.length > 0 &&
            books.map((b, i) => {
              return <Book book={b} key={i} />;
            })}
        </View>
      </ScrollView>
    </View>
  );
};

export default BookList;
