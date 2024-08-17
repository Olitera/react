import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainComponent from './components/main.component.tsx';
import UpcontrollerForm from './components/upcontroller-form.tsx';

function App(): React.ReactElement {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainComponent />} />
        <Route path="/upcontroller-form" element={<UpcontrollerForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
