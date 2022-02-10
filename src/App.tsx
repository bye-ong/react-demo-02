import React from 'react';
import logo from './logo.svg';
import './App.css';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

import Counter from './components/counter/Counter';
import Books from './components/books/Books';
import CardContainer from './components/dnd-card/CardContainer';

const App: React.FC = () => {
    return (
        <DndProvider backend={HTML5Backend}>
            <Counter />
            <Books />
            <CardContainer />
        </DndProvider>
    );
};

export default App;
