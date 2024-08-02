import React from 'react';

const ChampionFieldEditor = ({ field, champion, setChampion, classesMCOC }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setChampion((prev) => ({ ...prev, [name]: value }));
  };

  if (field === 'categoria') {
    return (
      <select name="categoria" value={champion.categoria} onChange={handleChange}>
        {classesMCOC.map((classe) => (
          <option key={classe} value={classe}>{classe}</option>
        ))}
      </select>
    );
  }

  return (
    <input type="text" name={field} value={champion[field]} onChange={handleChange} />
  );
};

export default ChampionFieldEditor;