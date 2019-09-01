import React from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { connect } from "react-redux";
import { Container, Tabs, Tab } from "native-base";

import { getBooks, deleteBook, changeStatus } from "../store/actions";

import BookFlatList from "../components/BookFlatList";

class HomeScreen extends React.Component {
  async componentDidMount() {
    this.props.getBooks();
  }

  render() {
    const { container } = styles;
    const { loading, books } = this.props;
    return (
      <View style={container}>
        <Container>
          <Tabs style={{ backgroundColor: "white" }}>
            <Tab
              heading="Wishlist"
              tabStyle={{ backgroundColor: "white" }}
              activeTabStyle={{ backgroundColor: "white" }}
            >
              <BookFlatList
                books={books}
                deleteBook={deleteBook}
                changeStatus={changeStatus}
                loading={loading}
                status="wishlist"
              />
            </Tab>
            <Tab
              heading="Reading"
              tabStyle={{ backgroundColor: "white" }}
              activeTabStyle={{ backgroundColor: "white" }}
            >
              <BookFlatList
                books={books}
                deleteBook={deleteBook}
                changeStatus={changeStatus}
                loading={loading}
                status="reading"
              />
            </Tab>
            <Tab
              heading="Read"
              tabStyle={{ backgroundColor: "white" }}
              activeTabStyle={{ backgroundColor: "white" }}
            >
              <BookFlatList
                books={books}
                deleteBook={deleteBook}
                changeStatus={changeStatus}
                loading={loading}
                status="read"
              />
            </Tab>
          </Tabs>
        </Container>
        {loading && <ActivityIndicator size="large" />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});

export default connect(
  ({ books: { books, loading, error } }) => ({ books, loading, error }),
  { getBooks }
)(HomeScreen);
