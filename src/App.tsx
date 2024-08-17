import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainComponent from './components/main.component.tsx';
import UncontrolledForm from './components/uncontrolled-form.tsx';

function App(): React.ReactElement {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainComponent />} />
        <Route path="/upcontroller-form" element={<UncontrolledForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
