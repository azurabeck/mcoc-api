const express = require('express');
const router = express.Router();
const Champion = require('../models/champion');

// GET all champions
router.get('/', async (req, res) => {
  try {
    const champions = await Champion.find();
    res.json(champions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a champion by ID
router.get('/:id', async (req, res) => {
  try {
    const champion = await Champion.findById(req.params.id);
    if (champion == null) {
      return res.status(404).json({ message: 'Campeão não encontrado' });
    }
    res.json(champion);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new champion
router.post('/', async (req, res) => {
  const champion = new Champion(req.body);

  try {
    const newChampion = await champion.save();
    res.status(201).json(newChampion);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT to update a champion by ID
router.put('/:id', async (req, res) => {
  try {
    const champion = await Champion.findById(req.params.id);
    if (champion == null) {
      return res.status(404).json({ message: 'Campeão não encontrado' });
    }

    Object.assign(champion, req.body);

    const updatedChampion = await champion.save();
    res.json(updatedChampion);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE a champion by ID
router.delete('/:id', async (req, res) => {
  try {
    console.log(`Tentativa de deletar o campeão com ID: ${req.params.id}`);
    const champion = await Champion.findById(req.params.id);
    if (champion == null) {
      console.log('Campeão não encontrado');
      return res.status(404).json({ message: 'Campeão não encontrado' });
    }

    await Champion.deleteOne({ _id: req.params.id });
    res.json({ message: 'Campeão deletado' });
  } catch (err) {
    console.error('Erro ao deletar campeão:', err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
