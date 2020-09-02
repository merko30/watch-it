import {ThunkAction} from 'redux-thunk';
import {RootState} from 'src/store/reducers';
import {Action} from 'redux';

export * from './Book';
export * from './User';
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
