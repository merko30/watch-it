import React from "react";
import { connect } from "react-redux";

import { View, ActivityIndicator } from "react-native";

import SearchBar from "../components/SearchBar";

import { getBooks, clearSearch } from "../store/actions";
import BookList from "../components/BookList";

class Search extends React.Component {
  componentDidMount() {
    this.props.getBooks();
  }

  render() {
    const { books, loading } = this.props;
    return (
      <View style={{ flex: 1, marginVertical: 20 }}>
        <SearchBar />
        <View style={{ flex: 1 }}>{books && <BookList books={books} />}</View>
        {loading && <ActivityIndicator size="large" />}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    books: state.books.searchResults,
    loading: state.books.getLoading
  };
};

export default connect(
  mapStateToProps,
  { getBooks, clearSearch }
)(Search);
