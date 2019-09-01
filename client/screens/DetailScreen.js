import React from "react";
import { View, StyleSheet, Image, Dimensions, ScrollView } from "react-native";
import { Title, Button, ActionSheet, Text, Icon } from "native-base";
import { connect } from "react-redux";

import {
  getBook,
  changeStatus,
  addBook,
  deleteBook
} from "../store/actions/BookActions";
import { statusesToShow } from "../utils/menu";

class DetailScreen extends React.Component {
  handleClick = index => {
    const {
      book,
      books,
      changeStatus,
      deleteBook,
      addBook,
      history: {
        location: {
          state: { id }
        }
      }
    } = this.props;
    const alreadyExists = books.find(book => book.bookId === id);
    const clicked = statusesToShow(alreadyExists).options[index].key;

    if (alreadyExists) {
      if (
        clicked === "wishlist" ||
        clicked === "reading" ||
        clicked === "read"
      ) {
        changeStatus(alreadyExists._id, clicked);
      } else if (clicked === "remove") {
        console.log(clicked, alreadyExists._id);
        deleteBook(alreadyExists._id);
      }
    } else {
      addBook({
        title: book.volumeInfo.title,
        authors: book.volumeInfo.authors,
        bookId: book.id,
        status: clicked
      });
    }
  };

  componentDidMount() {
    const {
      getBook,
      history: {
        location: {
          state: { id }
        }
      }
    } = this.props;
    getBook(id);
  }

  removeTags = string => {
    return (
      string &&
      string
        .replace(/<[^>]*>/g, " ")
        .replace(/\s{2,}/g, " ")
        .trim()
    );
  };

  render() {
    const { book, books } = this.props;
    const { container, image, flexColumn } = styles;
    return (
      <View style={container}>
        {book && (
          <ScrollView style={flexColumn}>
            {book.volumeInfo.imageLinks && (
              <Image
                source={{
                  uri:
                    book.volumeInfo.imageLinks.thumbnail ||
                    book.volumeInfo.imageLinks.smallThumbnail
                }}
                resizeMode="contain"
                style={image}
              />
            )}
            <Button
              transparent
              style={{ position: "absolute", top: 0, right: 0 }}
              onPress={() => {
                const bookExists = books.find(b => b.bookId == book.id);
                ActionSheet.show(
                  statusesToShow(bookExists, false),
                  buttonIndex => this.handleClick(buttonIndex)
                );
              }}
            >
              <Icon name="dots-three-vertical" type="Entypo" />
            </Button>
            {book.volumeInfo.title && (
              <Title style={{ textAlign: "left" }}>
                {book.volumeInfo.title}
              </Title>
            )}
            {book.volumeInfo.authors &&
              book.volumeInfo.authors.map(author => {
                return <Text key={author}>{author}</Text>;
              })}
            {book.volumeInfo.description && (
              <View>
                <Text>Description:</Text>
                <Text style={{}}>
                  {" "}
                  {this.removeTags(book.volumeInfo.description)}
                </Text>
              </View>
            )}
          </ScrollView>
        )}
      </View>
    );
  }
}

var { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 14,
    backgroundColor: "white",
    position: "relative"
  },
  author: {
    fontWeight: "bold",
    marginBottom: 6
  },
  image: {
    height: 240,
    width: width * 0.4
  }
});

export default connect(
  ({ books: { book, books } }) => ({ book, books }),
  { getBook, changeStatus, addBook, deleteBook }
)(DetailScreen);
