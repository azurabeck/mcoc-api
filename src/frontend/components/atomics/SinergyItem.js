import React from 'react';

const SinergyItem = ({ sinergia, index, editing, setEditing, setChampionSinergy , onDelete }) => {
  const handleEditClick = () => setEditing(`sinergia_${index}`);

  if (editing === `sinergia_${index}`) {
    return (
      <div>
        <input
          type="text"
          name="campeoes"
          value={sinergia.campeoes.join(', ')}
          onChange={(e) => {
            const updatedSinergy = { ...sinergia, campeoes: e.target.value.split(',').map(campeao => campeao.trim()) };
            setChampionSinergy((prev) => prev.map((s, i) => (i === index ? updatedSinergy : s)));
          }}
        />
        <input
          type="text"
          name="nome"
          value={sinergia.nome}
          onChange={(e) => {
            const updatedSinergy = { ...sinergia, nome: e.target.value };
            setChampionSinergy((prev) => prev.map((s, i) => (i === index ? updatedSinergy : s)));
          }}
        />
        <input
          type="text"
          name="descricao"
          value={sinergia.descricao}
          onChange={(e) => {
            const updatedSinergy = { ...sinergia, descricao: e.target.value };
            setChampionSinergy((prev) => prev.map((s, i) => (i === index ? updatedSinergy : s)));
          }}
        />
        <button onClick={() => setEditing(null)}>Salvar</button>
      </div>
    );
  }

  return (
    <div>
      <p>Campeões: {sinergia.campeoes.join(', ')}</p>
      <p>Nome: {sinergia.nome}</p>
      <p>Descrição: {sinergia.descricao}</p>
      <button className='--edit' onClick={handleEditClick}>Editar</button>
      <button className='--delete' onClick={onDelete}>Excluir</button>
    </div>
  );
};

export default SinergyItem;
