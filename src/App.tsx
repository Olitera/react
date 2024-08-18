import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainComponent from './components/main.component.tsx';
import UncontrolledForm from './components/uncontrolled-form.tsx';
import ReactHookForm from './components/react-hook-form.tsx';

function App(): React.ReactElement {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainComponent />} />
        <Route path="/upcontroller-form" element={<UncontrolledForm />} />
        <Route path="/react-hook-form" element={<ReactHookForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
