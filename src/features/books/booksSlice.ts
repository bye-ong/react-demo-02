import { RootState } from '@/modules';
import {
    createSelector,
    createEntityAdapter,
    createSlice,
    CombinedState,
} from '@reduxjs/toolkit';

export type TBook = {
    bookId: string;
    title: string;
};

const booksAdapter = createEntityAdapter<TBook>({
    selectId: (book) => book.bookId,
    sortComparer: (a, b) => a.title.localeCompare(b.title),
});

const name = 'books';
const initialState = booksAdapter.getInitialState({
    loading: 'idle',
});

const booksSlice = createSlice({
    name,
    initialState,
    reducers: {
        bookAdded: booksAdapter.addOne,
        bookUpdated: booksAdapter.updateOne,
        booksLoading(state) {
            if (state.loading === 'idle') {
                state.loading = 'pending';
            }
        },
        booksRecived(state, action) {
            if (state.loading === 'pending') {
                booksAdapter.setAll(state, action.payload);
                state.loading = 'idle';
            }
        },
    },
});

export const getList = createSelector(
    (state) => state[name],
    (list) => {
        return list;
    },
);
// export const booksSelector = booksAdapter.getSelectors(
//     (state: DefaultRootState) => state[name],
// );
export const { bookAdded, bookUpdated, booksLoading, booksRecived } =
    booksSlice.actions;

export const { selectAll: selectAllBooks } = booksAdapter.getSelectors(
    (state: RootState) => state[name],
);

export const books = name;

export default booksSlice.reducer;
