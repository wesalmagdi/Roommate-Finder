import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import { BrowserRouter,Routes, Route } from 'react-router-dom';
function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
      <Navbar />
        <Routes>
          
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/login" element={<LoginScreen />} />
        </Routes>
      </BrowserRouter>


      {/* Add dummy scrollable content */}
      <div style={{ height: "2000px", backgroundColor: "#f5f5f5", paddingTop: "100px" }}>
        <h1 style={{ textAlign: "center" }}>Scroll down to test the navbar!</h1>
      </div>
      


     
    </div>
  );
}

export default App;
