import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import Dashboard  from './pages/Dashboard';
import HighlightedCars from './pages/HighlightedCars';
import CarAnalysis from './pages/CarAnalysis'; // Import CarAnalysis
import './App.css'; // Optional: for styling the header

const App = () => (
  <div>
    <header className="app-header">
      <h1>Car Market</h1>
    </header>
    <main>
      <Routes>
        <Route path="/" element={<HighlightedCars />} />
        <Route path="/car-analysis" element={<CarAnalysis />} />
        <Route path="/highlighted" element={<Dashboard />} />
      </Routes>
    </main>
  </div>
);

export default App;
