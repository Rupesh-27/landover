import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import HouseOfBrands from './pages/HouseOfBrands';
import DefenderPage from './pages/DefenderPage';
import RangeRoverPage from './pages/RangeRoverPage';
import DiscoveryPage from './pages/DiscoveryPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HouseOfBrands />} />
        <Route path="/defender" element={<DefenderPage />} />
        <Route path="/rangerover" element={<RangeRoverPage />} />
        <Route path="/discovery" element={<DiscoveryPage />} />
      </Routes>
    </Router>
  );
}

export default App;
