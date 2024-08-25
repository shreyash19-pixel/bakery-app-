import {React , useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from '../../components/Register';
import Login from '../../components/Login';
import Homepage from '../../components/Homepage';
import NotFound from '../../components/NotFound';
import { CartProvider } from '../../ContextApi/AppContext';
import DescPages from '../../views/DescPages';

const Home = () => {
    
  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          <Route exact path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/homePage" element={<Homepage />} />
          <Route path="/DescPage/:id" element={<DescPages />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
};

export default Home;
