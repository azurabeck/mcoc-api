import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ handleCategoryFilter, handleSearch, handleSort }) => {
  return (
    <nav style={styles.nav}>
      <ul style={styles.ul}>
        <li style={styles.li}>
          <Link to="/" style={styles.link}>Home</Link>
        </li>
        <li style={styles.li}>
          <Link to="/add" style={styles.link}>Adicionar Campeão</Link>
        </li>
        <li style={styles.li}>
          <button onClick={() => handleCategoryFilter('Mutante')} style={styles.button}>Mutante</button>
        </li>
        <li style={styles.li}>
          <button onClick={() => handleCategoryFilter('Cósmico')} style={styles.button}>Cósmico</button>
        </li>
        <li style={styles.li}>
          <button onClick={() => handleCategoryFilter('Tecnológico')} style={styles.button}>Tecnológico</button>
        </li>
        <li style={styles.li}>
          <button onClick={() => handleCategoryFilter('Habilidade')} style={styles.button}>Habilidade</button>
        </li>
        <li style={styles.li}>
          <button onClick={() => handleCategoryFilter('Científico')} style={styles.button}>Científico</button>
        </li>
        <li style={styles.li}>
          <button onClick={() => handleCategoryFilter('Místico')} style={styles.button}>Místico</button>
        </li>
        <li style={styles.li}>
          <button onClick={() => handleCategoryFilter('Universal')} style={styles.button}>Universal</button>
        </li>
      </ul>
      <input
        type="text"
        placeholder="Pesquisar Campeão"
        onChange={(e) => handleSearch(e.target.value)}
        style={styles.search}
      />
      <select onChange={(e) => handleSort(e.target.value)} style={styles.sort}>
        <option value="">Ordenar por</option>
        <option value="asc">Nome (A-Z)</option>
        <option value="desc">Nome (Z-A)</option>
      </select>
    </nav>
  );
};

const styles = {
  nav: {
    backgroundColor: '#333',
    padding: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ul: {
    listStyleType: 'none',
    margin: 0,
    padding: 0,
    display: 'flex',
    justifyContent: 'space-around',
  },
  li: {
    display: 'inline',
    margin: '0 10px',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '18px',
  },
  button: {
    backgroundColor: '#555',
    color: 'white',
    border: 'none',
    padding: '10px',
    cursor: 'pointer',
  },
  search: {
    padding: '10px',
    fontSize: '16px',
  },
  sort: {
    padding: '10px',
    fontSize: '16px',
    marginLeft: '10px',
  }
};

export default Navbar;
