const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = (req, res) => {
  const { email, senha } = req.body;

  db.query('SELECT * FROM usuario WHERE email = ?', [email], (err, results) => {
    if (err) return res.status(500).json({ erro: 'Erro ao buscar usuário' });
    if (results.length === 0) return res.status(401).json({ erro: 'Email ou senha inválidos' });

    const usuario = results[0];

    bcrypt.compare(senha, usuario.senha, (err, igual) => {
      if (err) return res.status(500).json({ erro: 'Erro ao verificar senha' });
      if (!igual) return res.status(401).json({ erro: 'Email ou senha inválidos' });

      const token = jwt.sign(
        { id: usuario.id, nome: usuario.nome },
        process.env.JWT_SECRET,
        { expiresIn: '8h' }
      );

      res.json({ mensagem: 'Login realizado com sucesso!', token });
    });
  });
};

module.exports = { login };