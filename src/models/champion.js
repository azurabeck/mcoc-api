const mongoose = require('mongoose');

const validCategories = ["Mutante", "Cósmico", "Tecnológico", "Habilidade", "Científico", "Místico", "Universal"];
const validTiers = ["S+", "S", "A", "B", "C", "D", "E"];

const championSchema = new mongoose.Schema({
  name: { type: String, required: true },
  tags: [String],
  category: { type: String, enum: validCategories, required: true },
  weakAgainstCategories: [String],
  strongAgainstCategories: [String],
  strongAgainst: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Champion' }],
  weakAgainst: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Champion' }],
  immunities: [String],
  buffs: [String],
  special01: { name: String, description: String },
  special02: { name: String, description: String },
  special03: { name: String, description: String },
  avatarUrl: String,
  tips: String,
  attackTier: { type: String, enum: validTiers, required: true },
  defenceTier: { type: String, enum: validTiers, required: true },
});

const Champion = mongoose.model('Champion', championSchema);

module.exports = Champion;
