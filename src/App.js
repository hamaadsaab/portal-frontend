import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import PictureDisplay from './components/PictureDisplay';
import NavigationBar from './components/NavigationBar';
import Webcamm from './components/Webcamm';

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term) => {
    setSearchTerm(term); // Update the search term state
  };

  return (
    <Router>
      <div className="App">
        <NavigationBar onSearch={handleSearch} />
        <Routes>
          <Route
            path="/"
            element={<PictureDisplay searchTerm={searchTerm} />} // Pass the searchTerm prop
          />
          <Route path="/webcam" element={<Webcamm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
