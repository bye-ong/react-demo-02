import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ICommon = {};

const initState: ICommon = {};

const slice = createSlice({
    name: 'COMMON',
    initialState: initState,
    reducers: {},
});

export const COMMON = slice.name;
export const commonReducer = slice.reducer;
export const commonAction = slice.actions;
