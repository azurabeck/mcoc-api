import React from 'react';

const DetailsParagraph = ({
  title,
  value,
  field,
  editing,
  setEditing,
  champion,
  setChampion,
  handleSaveClick // Adicionando prop para lidar com o salvamento
}) => {
  const tiers = ['S+', 'S', 'A', 'B', 'C', 'D', 'E']; // As opções de tier

  const handleChange = (e) => {
    setChampion({ ...champion, [field]: e.target.value });
  };

  return (
    editing === field ? (
      field === 'tier_attack' || field === 'tier_defense' ? (
        <div className="champion-paragraph">
          <div>
            <strong>{title}</strong>
            {tiers.map(tier => (
              <label key={tier}>
                <input
                  type="radio"
                  name={field}
                  value={tier}
                  checked={champion[field] === tier}
                  onChange={handleChange}
                /> {tier}
              </label>
            ))}
          </div>
          <button className='--save' onClick={() => {
            setEditing(null);
            handleSaveClick(field);
          }}>Salvar</button>
        </div>
      ) : (
        <div className="champion-paragraph">
          <div>
            <strong>{title}</strong>
            <input type="text" value={value} onChange={handleChange} />
          </div>
          <button className='--save' onClick={() => {
            setEditing(null);
            handleSaveClick(field); 
          }}>Salvar</button>
        </div>
      )
    ) : (
      <div className="champion-paragraph">
        <div>
          <strong>{title}</strong>
          <p>{value}</p>
        </div>
        <button className='--edit' onClick={() => setEditing(field)}>Editar</button>
      </div>
    )
  );
};

export default DetailsParagraph;
