import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Backoffice from './Backoffice';
 
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/backoffice' element={<Backoffice/>} />
      </Routes>
    </BrowserRouter>
  );
}
 
export default App