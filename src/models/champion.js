const mongoose = require('mongoose');

const championSchema = new mongoose.Schema({
  name: { type: String, required: true },
  tags: [String],
  category: { type: String, required: true },
  weakAgainstCategories: [String],
  strongAgainstCategories: [String],
  strongAgainst: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Champion' }],
  weakAgainst: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Champion' }],
  immunities: [String],
  buffs: [String],
  special01: String,
  special02: String,
  special03: String,
});

const Champion = mongoose.model('Champion', championSchema);

module.exports = Champion;
