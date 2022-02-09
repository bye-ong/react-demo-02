import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { COMMON, commonReducer } from '../features/commonSlice';
import booksReducer, { books } from '../features/books/booksSlice';

import counterReducer, { counter } from '../features/counter/counterSlice';

export const rootReducer = combineReducers({
    [COMMON]: commonReducer,
    [books]: booksReducer,
    [counter]: counterReducer,
});

const createStore = () => {
    const store = configureStore({
        reducer: rootReducer,
        devTools: true,
    });
    return store;
};

export default createStore;
