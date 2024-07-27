const express = require('express');
const cors = require('cors');
const connectDB = require('./database');
const championRoutes = require('./routes/championRoutes');

const app = express();
const port = process.env.PORT || 3000;

connectDB();

app.use(cors()); // Middleware CORS
app.use(express.json()); // Middleware para processar JSON
app.use('/champions', championRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
