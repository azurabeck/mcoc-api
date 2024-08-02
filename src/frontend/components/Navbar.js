import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import '../styles/Navbar.css'; // Import the CSS file

const Navbar = ({ handleCategoryFilter, handleSearch, handleSort, activeCategory }) => {
  const location = useLocation();

  return (
    <nav className="nav">
      <ul className="ul">
        <li className="li">
          <NavLink to="/" className={({ isActive }) => isActive ? "link active" : "link"}>Lista de campeões</NavLink>
        </li>
        <li className="li">
          <NavLink to="/add" className={({ isActive }) => isActive ? "link active" : "link"}>Adicionar Campeão</NavLink>
        </li>
        <li className="li">
          <button 
            onClick={() => handleCategoryFilter('Mutante')} 
            className={activeCategory === 'Mutante' ? 'buttonNav active' : 'buttonNav'}
          >Mutante</button>
        </li>
        <li className="li">
          <button 
            onClick={() => handleCategoryFilter('Cósmico')} 
            className={activeCategory === 'Cósmico' ? 'buttonNav active' : 'buttonNav'}
          >Cósmico</button>
        </li>
        <li className="li">
          <button 
            onClick={() => handleCategoryFilter('Tecnológico')} 
            className={activeCategory === 'Tecnológico' ? 'buttonNav active' : 'buttonNav'}
          >Tecnológico</button>
        </li>
        <li className="li">
          <button 
            onClick={() => handleCategoryFilter('Habilidade')} 
            className={activeCategory === 'Habilidade' ? 'buttonNav active' : 'buttonNav'}
          >Habilidade</button>
        </li>
        <li className="li">
          <button 
            onClick={() => handleCategoryFilter('Científico')} 
            className={activeCategory === 'Científico' ? 'buttonNav active' : 'buttonNav'}
          >Científico</button>
        </li>
        <li className="li">
          <button 
            onClick={() => handleCategoryFilter('Místico')} 
            className={activeCategory === 'Místico' ? 'buttonNav active' : 'buttonNav'}
          >Místico</button>
        </li>
        <li className="li">
          <button 
            onClick={() => handleCategoryFilter('Universal')} 
            className={activeCategory === 'Universal' ? 'buttonNav active' : 'buttonNav'}
          >Universal</button>
        </li>
      </ul>
      <input
        type="text"
        placeholder="Pesquisar Campeão"
        onChange={(e) => handleSearch(e.target.value)}
        className="search"
      />
      <select onChange={(e) => handleSort(e.target.value)} className="sort">
        <option value="">Ordenar por</option>
        <option value="asc">Nome (A-Z)</option>
        <option value="desc">Nome (Z-A)</option>
      </select>
    </nav>
  );
};

export default Navbar;
