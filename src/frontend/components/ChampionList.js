import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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
      const matchesCategory = categoryFilter ? champion.category === categoryFilter : true;
      const matchesSearch = champion.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.name.localeCompare(b.name);
      } else if (sortOrder === 'desc') {
        return b.name.localeCompare(a.name);
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
      <h2>Lista de Campeões</h2>
      <ul>
        {filteredChampions.map((champion) => (
          <li key={champion._id}>
            <img src={champion.avatarUrl} alt={`${champion.name} avatar`} width="50" height="50" />
            <h3>{champion.name}</h3>
            <p>Categoria: {champion.category}</p>
            <p>Attack: {champion.attackTier}</p>
            <p>Defence: {champion.defenceTier}</p>
            <button onClick={() => handleDelete(champion._id)}>Deletar</button>
            <Link to={`/champions/${champion._id}`}>
              <button>Ver Detalhes</button>
            </Link>
            <Link to={`/champions/edit/${champion._id}`}>
              <button>Editar</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChampionList;
