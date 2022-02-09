import { createSelector, createSlice } from '@reduxjs/toolkit';

export type TCounter = {
    count: number;
    count2: number;
};

const name = 'counter';

const initialCounter: TCounter = {
    count: 0,
    count2: 0,
};

const counterSlice = createSlice({
    name,
    initialState: initialCounter,
    reducers: {
        increase: (state) => {
            state.count = state.count + 1;
        },
        decrease: (state) => {
            state.count = state.count - 1;
        },
        increaseBy: (state, action) => {
            state.count = state.count + action.payload;
        },
    },
});

export const {
    increase: increaseCounter,
    decrease: decreaseCounter,
    increaseBy: increaseByCounter,
} = counterSlice.actions;

export const selectCounter = createSelector(
    (state) => state[name],
    (counter) => counter,
);

export const counter = name;

export default counterSlice.reducer;
