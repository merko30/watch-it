import { createSelector } from "reselect";

const booksFromDatabase = state => state.books.books;

const getUser = state => state.auth.user;

export const getUsersBooks = createSelector(
    [booksFromDatabase, getUser],
    (books, user) => {
        if (user !== null && books !== null) {
            return books.filter(b => b.reader == user._id);
        } else {
            return [];
        }
    }
);

export const getCurrentlyReadingBooks = createSelector(
    [booksFromDatabase, getUser],
    (books, user) => {
        if (user !== null && books !== null) {
            return books.filter(
                b => b.reader == user._id && b.status == "reading"
            ).length;
        } else {
            return [];
        }
    }
);

export const getReadBooks = createSelector(
    [booksFromDatabase, getUser],
    (books, user) => {
        if (user !== null && books !== null) {
            return books.filter(b => b.reader == user._id && b.status == "read")
                .length;
        } else {
            return [];
        }
    }
);
