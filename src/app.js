const express = require('express');
const connectDB = require('./database');
const championRoutes = require('./routes/championRoutes');

const app = express();
const port = process.env.PORT || 3000;

connectDB();

app.use(express.json());
app.use('/champions', championRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
