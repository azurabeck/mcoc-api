import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import AddChampion from './components/AddChampion';
import ChampionList from './components/ChampionList';
import ChampionDetails from './components/ChampionDetails';
import './index.css'

const App = () => {
  const [categoryFilter, setCategoryFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [activeCategory, setActiveCategory] = useState('');

  const handleCategoryFilter = (category) => {
    setActiveCategory(category);
    setCategoryFilter(category);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleSort = (order) => {
    setSortOrder(order);
  };

  return (
    <Router>
      <div>
        <Navbar
           handleCategoryFilter={handleCategoryFilter} 
           handleSearch={handleSearch} 
           handleSort={handleSort}
           activeCategory={activeCategory}
        />
        <h1>Marvel Contest of Champions API</h1>
        <Routes>
          <Route
            path="/"
            element={<ChampionList categoryFilter={categoryFilter} searchTerm={searchTerm} sortOrder={sortOrder} />}
          />
          <Route path="/champions/:id" element={<ChampionDetails />} />
          <Route path="/add" element={<AddChampion />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
