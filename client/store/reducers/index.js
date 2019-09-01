import { combineReducers } from 'redux';

import authReducer from './AuthReducer';
import bookReducer from './BookReducer';


export default combineReducers({
    auth: authReducer,
    books: bookReducer,
})