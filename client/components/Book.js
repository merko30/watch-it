import React from "react";
import { View, Image, Dimensions, TouchableOpacity } from "react-native";
import { Title, Text, Icon } from "native-base";

import { formatName } from "../utils";

import history from "../config/history";

const Book = ({ book }) => {
  const renderAuthors = authorsArray => {
    if (authorsArray) {
      if (authorsArray.length < 3) {
        return authorsArray.map(author => {
          return <Text key={author}>{formatName(author)}</Text>;
        });
      } else {
        return (
          <View>
            {authorsArray.slice(0, 3).map(author => {
              return <Text key={author}>{formatName(author)}</Text>;
            })}
            <Text>...</Text>
          </View>
        );
      }
    }
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        marginVertical: 20
      }}
    >
      {book.volumeInfo.imageLinks && (
        <Image
          source={{
            uri:
              book.volumeInfo.imageLinks.thumbnail ||
              book.volumeInfo.imageLinks.smallThumbnail
          }}
          resizeMode="contain"
          style={{
            height: 200,
            width: Dimensions.get("window").width * 0.4
          }}
        />
      )}
      <View style={{ flex: 1, paddingRight: 5 }}>
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 5
          }}
        >
          {book.volumeInfo.title && (
            <Title style={{ flex: 1, textAlign: "left" }}>
              {book.volumeInfo.title}
            </Title>
          )}
        </View>
        <View style={{ paddingLeft: 10 }}>
          {renderAuthors(book.volumeInfo.authors)}
          {book.volumeInfo.categories &&
            book.volumeInfo.categories.map(category => {
              return (
                <Text key={category} style={{ lineHeight: 15, marginTop: 5 }}>
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
              onPress={() => history.push("/DetailScreen", { id: book.id })}
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
