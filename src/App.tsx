import React from 'react';
import logo from './logo.svg';
import './App.css';
import Counter from './components/counter/Counter';
import Books from './components/books/Books';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

const App: React.FC = () => {
    return (
        <DndProvider backend={HTML5Backend}>
            <Counter />
            <Books />
        </DndProvider>
    );
};

export default App;
