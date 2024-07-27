import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ChampionDetails = () => {
  const { id } = useParams();
  const [champion, setChampion] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/champions/${id}`)
      .then((response) => response.json())
      .then((data) => setChampion(data))
      .catch((error) => console.error('Erro ao carregar detalhes do campeão:', error));
  }, [id]);

  if (!champion) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <h2>{champion.name}</h2>
      <img src={champion.avatarUrl} alt={`${champion.name} avatar`} width="100" height="100" />
      <p>Categoria: {champion.category}</p>
      <p>Tags: {champion.tags.join(', ')}</p>
      <p>Imunidades: {champion.immunities.join(', ')}</p>
      <p>Buffs: {champion.buffs.join(', ')}</p>
      <p>Special 01: {champion.special01.name} - {champion.special01.description}</p>
      <p>Special 02: {champion.special02.name} - {champion.special02.description}</p>
      <p>Special 03: {champion.special03.name} - {champion.special03.description}</p>
      <p>Dicas: {champion.tips}</p>
      <p>Attack Tier: {champion.attackTier}</p>
      <p>Defense Tier: {champion.defenceTier}</p>
    </div>
  );
};

export default ChampionDetails;
