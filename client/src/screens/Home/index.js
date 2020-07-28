import React, { useEffect } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Container, Tabs, Tab } from "native-base";

import BookFlatList from "./components/BookFlatList";

import { COLORS } from "../../theme/colors";
import { deleteBook, getBooks } from "../../store/actions";
import Loading from "../../components/Loading";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ededed"
  }
});

const Home = () => {
  const dispatch = useDispatch();
  const { books, loading } = useSelector(({ book: { loading, books } }) => ({
    books,
    loading
  }));

  useEffect(() => {
    dispatch(getBooks());
  }, []);

  const tabProps = {
    tabStyle: { backgroundColor: "white" },
    activeTextStyle: { color: COLORS.darkBrown },
    textStyle: { color: COLORS.lightBrown },
    activeTabStyle: {
      backgroundColor: "white",
      color: COLORS.darkBrown
    }
  };

  return (
    <View style={styles.container}>
      <Container>
        <Tabs
          style={{ backgroundColor: "red" }}
          tabBarUnderlineStyle={{ backgroundColor: COLORS.darkBrown }}
        >
          <Tab heading="Wishlist" {...tabProps}>
            <BookFlatList
              books={books}
              deleteBook={deleteBook}
              loading={loading}
              status="wishlist"
            />
          </Tab>
          <Tab heading="Reading" {...tabProps}>
            <BookFlatList
              books={books}
              deleteBook={deleteBook}
              loading={loading}
              status="reading"
            />
          </Tab>
          <Tab heading="Read" {...tabProps}>
            <BookFlatList
              books={books}
              deleteBook={deleteBook}
              loading={loading}
              status="read"
            />
          </Tab>
        </Tabs>
      </Container>
      <Loading show={loading} />
    </View>
  );
};

export default Home;
