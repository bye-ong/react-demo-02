import { createSlice, createSelector } from '@reduxjs/toolkit';
import { arrayMove } from '../../utils/array-utils';

export type TCardAction = {
    payload: TMoveCardPayload;
    type: string;
};

export type TMoveCardPayload = {
    card: any;
    to: number;
};

export type TCard = {
    id: string;
    text: string;
    backgroundColor: string;
};

const name = 'card';

const initialState = {
    cards: [],
};

const cardSlice = createSlice({
    name,
    initialState,
    reducers: {
        setCard: (state, action) => {
            state.cards = action.payload;
        },
        moveCard: (state, action) => {
            state.cards = arrayMove(
                state.cards,
                action.payload.from,
                action.payload.to,
            );
        },
    },
});

const cardSelector = (state) => state[name];

export const getCardList = createSelector([cardSelector], (card) => card.cards);

export const findCardById = (id) =>
    createSelector([cardSelector], (cards) =>
        cards.filter((card) => {
            if (card.id === id) {
                return {
                    card,
                    index: cards.indexOf(card),
                };
            }
        }),
    );

export const { setCard, moveCard } = cardSlice.actions;

export const card = name;

export default cardSlice.reducer;
