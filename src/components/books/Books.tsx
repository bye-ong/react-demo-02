import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllBooks, bookAdded } from '../../features/books/booksSlice';
import styled from 'styled-components';
import { nanoid } from '@reduxjs/toolkit';

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

const Books: React.FC = (prop: any) => {
    const dispatch = useDispatch();

    const booksList = useSelector(selectAllBooks);

    const onClickAddOneBook = () => {
        dispatch(
            bookAdded({
                bookId: nanoid(),
                title: 'add One Book',
            }),
        );
        console.log('onclick addOneBook button');
    };

    return (
        <>
            <Button onClick={onClickAddOneBook}>add Book</Button>
            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>title</th>
                    </tr>
                </thead>
                <tbody>
                    {booksList.map((book: any, idx) => {
                        return (
                            <tr key={idx}>
                                <td>{book.bookId}</td>
                                <td>{book.title}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
};

export default Books;
