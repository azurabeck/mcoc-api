import React, { useState } from 'react';
import SinergyItem from './SinergyItem';

const SinergyList = ({ championSinergy, setChampionSinergy, editing, setEditing }) => {
  const [newSinergy, setNewSinergy] = useState({ campeoes: '', nome: '', descricao: '' });

  const handleAddSinergy = () => {
    if (!newSinergy.campeoes || !newSinergy.nome || !newSinergy.descricao) {
      alert('Todos os campos devem ser preenchidos.');
      return;
    }
    const updatedSinergies = [
      ...championSinergy,
      { ...newSinergy, campeoes: newSinergy.campeoes.split(',').map(campeao => campeao.trim()) }
    ];
    setChampionSinergy(updatedSinergies);
    setNewSinergy({ campeoes: '', nome: '', descricao: '' }); // Reset form
  };

  const handleDeleteSinergy = (index) => {
    const updatedSinergies = championSinergy.filter((_, idx) => idx !== index);
    setChampionSinergy(updatedSinergies);
  };

  return (
    <div>
      {championSinergy.map((sinergia, index) => (
        <SinergyItem key={index} sinergia={sinergia} index={index} editing={editing} setEditing={setEditing} setChampionSinergy={setChampionSinergy} onDelete={() => handleDeleteSinergy(index)} />
      ))}
      <div>
        <h3>Adicionar Nova Sinergia</h3>
        <input type="text" value={newSinergy.campeoes} onChange={(e) => setNewSinergy({ ...newSinergy, campeoes: e.target.value })} placeholder="Campeões" />
        <input type="text" value={newSinergy.nome} onChange={(e) => setNewSinergy({ ...newSinergy, nome: e.target.value })} placeholder="Nome da Sinergia" />
        <input type="text" value={newSinergy.descricao} onChange={(e) => setNewSinergy({ ...newSinergy, descricao: e.target.value })} placeholder="Descrição" />
        <button onClick={handleAddSinergy}>Adicionar Sinergia</button>
      </div>
    </div>
  );
};

export default SinergyList;
