import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    selectCounter,
    decreaseCounter,
    increaseByCounter,
    increaseCounter,
} from '../../features/counter/counterSlice';
import styled from 'styled-components';

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

const CountWarp = styled.div`
    width: 30em;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const CountDisplay = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
`;

const Counter: React.FC = (prop: any) => {
    const dispatch = useDispatch();
    const { count, count2 } = useSelector(selectCounter);

    const onDecrease = () => {
        dispatch(decreaseCounter());
    };

    const onIncrease = () => {
        dispatch(increaseCounter());
    };

    const onIncreaseBy = (num: number) => {
        dispatch(increaseByCounter(num));
    };

    return (
        <CountWarp>
            <h1>{count}</h1>
            <h1>{count2}</h1>
            <CountDisplay>
                <Button onClick={onDecrease}>-1</Button>
                <Button onClick={onIncrease}>+1</Button>
                <Button onClick={() => onIncreaseBy(5)}>+5</Button>
            </CountDisplay>
        </CountWarp>
    );
};

export default Counter;
