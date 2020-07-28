import React, { useEffect } from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import Loading from "../../components/Loading";
import BookList from "./components/BookList";
import SearchBar from "./components/SearchBar";

import { search } from "../../store/actions";

const Search = () => {
  const dispatch = useDispatch();
  const { books, loading } = useSelector(
    ({ book: { searchResults, loading } }) => ({
      books: searchResults,
      loading
    })
  );

  // useEffect(() => {}, [books]);

  const onSearch = term => {
    dispatch(search(term));
  };

  return (
    <View style={{ flex: 1 }}>
      <SearchBar onSearch={onSearch} />
      <Loading show={loading} />
      {books && <BookList books={books} />}
    </View>
  );
};

export default Search;
