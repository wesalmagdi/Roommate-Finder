import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import AboutUs from './screens/AboutUs';

import { BrowserRouter,Routes, Route } from 'react-router-dom';
function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/about" element={<AboutUs />} />
           
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/login" element={<LoginScreen />} />

        </Routes>
      </BrowserRouter>


      


     
    </div>
  );
}

export default App;
