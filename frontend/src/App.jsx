import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Register from './pages/Register';

function App() {
  return (
    <Router>
      <div className="bg-[#08060d] min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          {/* Add more routes here as we build them */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
