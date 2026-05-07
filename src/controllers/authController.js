const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const result = await db.query('SELECT * FROM usuario WHERE email = $1', [email]);

    if (result.rows.length === 0) {
      return res.status(401).json({ erro: 'Email ou senha inválidos' });
    }

    const usuario = result.rows[0];

    const igual = await bcrypt.compare(senha, usuario.senha);

    if (!igual) {
      return res.status(401).json({ erro: 'Email ou senha inválidos' });
    }

    const token = jwt.sign(
      { id: usuario.id, nome: usuario.nome },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.json({ mensagem: 'Login realizado com sucesso!', token });

  } catch (err) {
    res.status(500).json({ erro: 'Erro ao realizar login' });
  }
};

module.exports = { login };