const express = require('express');
const cors = require('cors');
require('dotenv').config();

const db = require('./src/config/db');
const produtoRoutes = require('./src/routes/produtoRoutes');
const usuarioRoutes = require('./src/routes/usuarioRoutes');
const authRoutes = require('./src/routes/authRoutes');
const vendaRoutes = require('./src/routes/vendaRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/produtos', produtoRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/vendas', vendaRoutes);

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.json({ mensagem: 'API Gestão de Estoque funcionando!', status: 'online' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});