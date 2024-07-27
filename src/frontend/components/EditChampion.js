import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditChampion = () => {
  const { id } = useParams();
  const [champion, setChampion] = useState(null);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3000/champions/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setChampion(data);
        setFormData(data);
      })
      .catch((error) => console.error('Erro ao carregar detalhes do campeão:', error));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/champions/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        navigate(`/champions/${id}`);
      } else {
        console.error('Erro ao atualizar campeão:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao atualizar campeão:', error);
    }
  };

  if (!champion) {
    return <div>Carregando...</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nome:
        <input type="text" name="name" value={formData.name || ''} onChange={handleChange} />
      </label>
      <label>
        Categoria:
        <input type="text" name="category" value={formData.category || ''} onChange={handleChange} />
      </label>
      <label>
        Imunidades:
        <input type="text" name="immunities" value={formData.immunities || ''} onChange={handleChange} />
      </label>
      <label>
        Buffs:
        <input type="text" name="buffs" value={formData.buffs || ''} onChange={handleChange} />
      </label>
      <label>
        Special 01 Nome:
        <input type="text" name="special01.name" value={formData.special01?.name || ''} onChange={handleChange} />
      </label>
      <label>
        Special 01 Descrição:
        <input type="text" name="special01.description" value={formData.special01?.description || ''} onChange={handleChange} />
      </label>
      <label>
        Special 02 Nome:
        <input type="text" name="special02.name" value={formData.special02?.name || ''} onChange={handleChange} />
      </label>
      <label>
        Special 02 Descrição:
        <input type="text" name="special02.description" value={formData.special02?.description || ''} onChange={handleChange} />
      </label>
      <label>
        Special 03 Nome:
        <input type="text" name="special03.name" value={formData.special03?.name || ''} onChange={handleChange} />
      </label>
      <label>
        Special 03 Descrição:
        <input type="text" name="special03.description" value={formData.special03?.description || ''} onChange={handleChange} />
      </label>
      <label>
        Avatar URL:
        <input type="text" name="avatarUrl" value={formData.avatarUrl || ''} onChange={handleChange} />
      </label>
      <label>
        Dicas:
        <textarea name="tips" value={formData.tips || ''} onChange={handleChange} />
      </label>
      <label>
        Attack Tier:
        <select name="attackTier" value={formData.attackTier || ''} onChange={handleChange}>
          <option value="S+">S+</option>
          <option value="S">S</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
          <option value="E">E</option>
        </select>
      </label>
      <label>
        Defense Tier:
        <select name="defenceTier" value={formData.defenceTier || ''} onChange={handleChange}>
          <option value="S+">S+</option>
          <option value="S">S</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
          <option value="E">E</option>
        </select>
      </label>
      <button type="submit">Atualizar Campeão</button>
    </form>
  );
};

export default EditChampion;
