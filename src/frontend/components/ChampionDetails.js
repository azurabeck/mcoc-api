import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/ChampionDetails.css'; // Importando o arquivo CSS
import ChampionFieldEditor from './atomics/ChampionFieldEditor';
import SinergyList from './atomics/SinergyList';
import DetailsParagraph from './atomics/DetailsParagraph';

const classesMCOC = [
  'Mutante',
  'Tecnológico',
  'Místico',
  'Cósmico',
  'Habilidade',
  'Científico',
  'Universal'
];

const ChampionDetails = () => {
  const { id } = useParams();
  const [champion, setChampion] = useState(null);
  const [championSinergy, setChampionSinergy] = useState([]);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/champions/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setChampion(data);
        const sinergias = Object.values(data.sinergia).map(sinergia => ({
          ...sinergia,
          campeoes: [sinergia.campeao],
        }));
        setChampionSinergy(sinergias);
      })
      .catch((error) => console.error('Erro ao carregar detalhes do campeão:', error));
  }, [id]);

  const handleEditClick = (field) => setEditing(field);

  const handleSaveClick = (field) => {
    setEditing(null);
    fetch(`http://localhost:3000/champions/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...champion, [field]: champion[field] }),
    }).catch((error) => console.error('Erro ao atualizar campeão:', error));
  };

  if (!champion) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="champion-details">
      <h2 className="champion-name">
        {editing === 'nome' ? (
          <>
            <ChampionFieldEditor field='nome' champion={champion} setChampion={setChampion} />
            <button className='--save' onClick={() => handleSaveClick('nome')}>Salvar</button>
          </>
        ) : (
          <>
            {champion.nome}
            <button className='--edit' onClick={() => handleEditClick('nome')}>Editar</button>
          </>
        )}
      </h2>
      {editing === 'avatarUrl' ? (
        <>
          <input type="text" value={champion.avatarUrl} onChange={(e) => setChampion({ ...champion, avatarUrl: e.target.value })} />
          <button className='--save' onClick={() => handleSaveClick('avatarUrl')}>Salvar</button>
        </>
      ) : (
        <img className="champion-avatar" src={champion.avatarUrl} alt={`${champion.nome} avatar`} width="100" height="100" onClick={() => handleEditClick('avatarUrl')} />
      )}
      {['categoria', 'tags', 'imunidades', 'fraquezas', 'buffs', 'passivos', 'reliquias_recomendadas'].map((field) => (
        <div key={field} className="champion-field">
          {editing === field ? (
            <>
              <ChampionFieldEditor field={field} champion={champion} setChampion={setChampion} classesMCOC={classesMCOC} />
              <button className='--save' onClick={() => handleSaveClick(field)}>Salvar</button>
            </>
          ) : (
            <>
              {field.charAt(0).toUpperCase() + field.slice(1).replace(/_/g, ' ')}: {Array.isArray(champion[field]) ? champion[field].join(', ') : champion[field]}
              <button className='--edit' onClick={() => handleEditClick(field)}>Editar</button>
            </>
          )}
        </div>
      ))}
      <div className='sinergyArea'>
        <h3>Sinergias</h3>
        <SinergyList championSinergy={championSinergy} setChampionSinergy={setChampionSinergy} editing={editing} setEditing={setEditing} />
      </div>

      {['melhor_sinergia_ataque', 'melhor_sinergia_defesa', 'times_recomendados', 'principal_caracteristica', 'foco_atributo_atacante', 'foco_atributo_defensor', 'estrategia_de_jogo', 'tier_attack', 'tier_defense'].map(field => (
        <DetailsParagraph
          key={field}
          title={`${field.replace(/_/g, ' ').charAt(0).toUpperCase() + field.slice(1).replace(/_/g, ' ')}:`}
          value={Array.isArray(champion[field]) ? champion[field].join(', ') : champion[field]}
          field={field}
          editing={editing}
          setEditing={setEditing}
          champion={champion}
          setChampion={setChampion}
          handleSaveClick={handleSaveClick}
        />
      ))}
    </div>
  );
};

export default ChampionDetails;
