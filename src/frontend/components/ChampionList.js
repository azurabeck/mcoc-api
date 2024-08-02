import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/ChampionList.css'; 

const ChampionList = ({ categoryFilter, searchTerm, sortOrder }) => {
  const [champions, setChampions] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/champions')
      .then((response) => response.json())
      .then((data) => setChampions(data))
      .catch((error) => console.error('Erro ao carregar campeões:', error));
  }, []);

  const filteredChampions = champions
    .filter((champion) => {
      const matchesCategory = categoryFilter ? champion.categoria === categoryFilter : true;
      const matchesSearch = searchTerm ? champion.nome.toLowerCase().includes(searchTerm.toLowerCase()) : true;
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.nome.localeCompare(b.nome);
      } else if (sortOrder === 'desc') {
        return b.nome.localeCompare(a.nome);
      } else {
        return 0;
      }
    });

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/champions/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setChampions(champions.filter((champion) => champion._id !== id));
      } else {
        console.error('Erro ao deletar campeão:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao deletar campeão:', error);
    }
  };

  return (
    <div>
      <p className="list-description">Exibindo: {filteredChampions.length} campeões</p>
      <ul className="champion-list">
        {filteredChampions.map((champion) => (
          <li key={champion._id} className="champion-item">
            <img src={champion.avatarUrl} alt={`${champion.nome} avatar`} width="50" height="50" />
            <h3>{champion.nome}</h3>
            <p>Categoria: {champion.categoria}</p>
            <p>Attack: {champion.tier_attack}</p>
            <p>Defence: {champion.tier_defense}</p>
            <Link to={`/champions/${champion._id}`}>
              <button className='--save'>Ver Detalhes</button>
            </Link>
            <button className='--delete' onClick={() => handleDelete(champion._id)}>Deletar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChampionList;
