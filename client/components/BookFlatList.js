import React from "react";
import { FlatList, View } from "react-native";

import BookItem from "./BookItem";
import { Text } from "native-base";

Text;

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
      <View style={{}}>
        <FlatList
          extraData={this.props}
          data={books.filter(b => b.status == status)}
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
