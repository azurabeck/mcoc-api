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

module.exports = router;
