import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import AboutUs from './screens/AboutUs';
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import { AuthProvider } from "./context/AuthContext";
import ProfileScreen from './screens/ProfileScreen';
import HelpScreen from './screens/HelpScreen';
function App() {
  return (
    <div className="App">
      <AuthProvider>
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/Help" element={<HelpScreen/>}/>
        </Routes>
      </BrowserRouter>
      </AuthProvider>


      


     
    </div>
  );
}

export default App;