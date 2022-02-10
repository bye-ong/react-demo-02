import React, { memo, useCallback } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import { getRandomBackgroundColor } from '../../utils/color-utils';

import {
    setCard,
    getCardList,
    TCard,
    moveCard,
} from '../../features/card/cardSlice';

import { Card } from './Card';
import { useDispatch } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';

import { arrayMove } from '../../utils/array-utils';

import { motion } from 'framer-motion';

const ContainerStyle = styled.div`
    width: 600px;
    height: 600px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 10px;
    border: 2px solid #0067ed;
    border-radius: 5px;
`;

const Button = styled.button`
    padding: 5px 15px;
    margin: 5px;
    background: #0067ed;
    border: 1px solid #0067ed;
    border-radius: 5px;
    color: #fff;

    &:hover {
        background: #7fb6ff;
        border: 1px solid #7fb6ff;
    }

    &:active {
        background: #6b9ad9;
        border: 1px solid #6b9ad9;
    }
`;

const CARD_ITEMS = new Array<TCard>();

for (let i = 1; i <= 8; i++) {
    const ranId = nanoid();
    CARD_ITEMS.push({
        id: ranId,
        text: 'id is:\n' + ranId,
        backgroundColor: getRandomBackgroundColor(),
    });
}

// const findCard = useCallback(
//     (id: string, atIndex) => {},
//     [findCard, card, setCard],
// );

const CardContainer: React.FC = (prop: any) => {
    const dispatch = useDispatch();

    const cards = useSelector(getCardList);

    if (cards.length === 0) dispatch(setCard(CARD_ITEMS));

    const moveCardCallback = useCallback(
        (dragIndex: number, hoverIndex: number) => {
            dispatch(moveCard({ from: dragIndex, to: hoverIndex }));
        },
        [],
    );

    const findCard = useCallback((id: string) => {
        return { index: 0 };
    }, []);

    const renderCards = (cards) => {
        return cards.map((card, idx) => (
            <Card
                key={card.id}
                id={card.id}
                text={card.text}
                index={idx}
                backgroundColor={card.backgroundColor}
                moveCard={moveCardCallback}
                findCard={findCard}
            />
        ));
    };
    const randomSwitch = () => {
        const from = Math.floor(Math.random() * cards.length),
            to = Math.floor(Math.random() * cards.length);
        const moved = arrayMove(cards, from, to);
        dispatch(setCard(moved));
    };

    return (
        <>
            <h2>dragzone(sort)</h2>
            <ContainerStyle>{renderCards(cards)}</ContainerStyle>
            <Button onClick={randomSwitch}>random switch</Button>
        </>
    );
};
export default memo(CardContainer);
