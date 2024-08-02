import React, { useState } from 'react';

const AddChampion = () => {
  const [jsonInput, setJsonInput] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/champions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: jsonInput,
      });
      if (response.ok) {
        const result = await response.json();
        console.log('Campeão adicionado com sucesso:', result);
      } else {
        const error = await response.json();
        console.error('Erro ao adicionar campeão:', error);
      }
    } catch (error) {
      alert('Erro ao adicionar campeão:', error);
    }
    setJsonInput('')
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="jsonInput">Insira o JSON do Campeão:</label>
      <textarea
        id="jsonInput"
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        rows="10"
        cols="50"
      />
      <button type="submit">Adicionar Campeão</button>
    </form>
  );
};

export default AddChampion;
