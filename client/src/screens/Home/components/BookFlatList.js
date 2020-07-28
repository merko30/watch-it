import React from "react";
import { FlatList, View } from "react-native";

import BookItem from "./BookItem";
import { Text } from "native-base";

class BookFlatList extends React.Component {
  renderAuthors = authors => {
    return (
      <View style={{}}>
        {authors &&
          authors.length < 4 &&
          authors.map((a, i) => {
            if (a == authors[authors.length - 1]) {
              if (authors.length !== 1) {
                return (
                  <Text style={{}} key={i}>
                    {" "}
                    {a}
                  </Text>
                );
              } else {
                return (
                  <Text style={{}} key={i}>
                    {a}
                  </Text>
                );
              }
            } else {
              return (
                <Text style={{}} key={i}>
                  {a} |
                </Text>
              );
            }
          })}
      </View>
    );
  };
  render() {
    const { books, status } = this.props;
    return (
      <View
        style={{
          marginTop: 10,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2
          },
          shadowOpacity: 0.8,
          shadowRadius: 1.41,

          elevation: 2
        }}
      >
        <FlatList
          extraData={this.props}
          data={books.filter(b => b.status === status)}
          renderItem={({ item }) => (
            <BookItem item={item} status={status} key={item._id} />
          )}
          keyExtractor={item => item._id}
        />
      </View>
    );
  }
}

export default BookFlatList;
