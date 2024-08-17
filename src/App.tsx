import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainComponent from './components/main.component.tsx';

function App(): React.ReactElement {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainComponent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
