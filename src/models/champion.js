const mongoose = require('mongoose');

const validCategories = ["Mutante", "Cósmico", "Tecnológico", "Habilidade", "Científico", "Místico", "Universal"];
const validTiers = ["S+", "S", "A", "B", "C", "D", "E"];

const specialSchema = new mongoose.Schema({
  nome: String,
  descricao: String,
});

const sinergiaSchema = new mongoose.Schema({
  campeao: String,
  nome: String,
  descricao: String,
});

const championSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  tags: [String],
  categoria: { type: String, enum: validCategories, required: true },
  imunidades: [String],
  fraquezas: [String],
  buffs: [String],
  passivos: [String],
  especial01: specialSchema,
  especial02: specialSchema,
  especial03: specialSchema,
  reliquias_recomendadas: [String],
  sinergia: {
    "01": sinergiaSchema,
    "02": sinergiaSchema,
  },
  times_recomendados: [String],
  principal_caracteristica: String,
  foco_atributo_atacante: String,
  foco_atributo_defensor: String,
  estrategia_de_jogo: String,
  avatarUrl: String,
  tier_attack: { type: String, enum: validTiers, required: true },
  tier_defense: { type: String, enum: validTiers, required: true },
});

const Champion = mongoose.model('Champion', championSchema);

module.exports = Champion;
