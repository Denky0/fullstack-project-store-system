const db = require('../config/db');
const bcrypt = require('bcrypt');

// Lista todos os usuários
const listarUsuarios = (req, res) => {
  db.query('SELECT id, nome, email FROM usuario', (err, results) => {
    if (err) return res.status(500).json({ erro: 'Erro ao buscar usuários' });
    res.json(results);
  });
};

// Cria os usuários
const criarUsuario = (req, res) => {
  const { nome, email, senha } = req.body;
  const saltRounds = 10;
  bcrypt.hash(senha, saltRounds, (err, hash) => {
    if (err) return res.status(500).json({ erro: 'Erro ao criptografar senha' });
    db.query('INSERT INTO usuario (nome, email, senha) VALUES (?, ?, ?)', [nome, email, hash], (err, results) => {
      if (err) return res.status(500).json({ erro: 'Erro ao criar usuário' });
      res.status(201).json({ mensagem: 'Usuário criado com sucesso!', id: results.insertId });
    });
  });
};

// Atualiza os usuários
const atualizarUsuario = (req, res) => {
  const { id } = req.params;
  const { nome, email } = req.body;
  db.query('UPDATE usuario SET nome = ?, email = ? WHERE id = ?', [nome, email, id], (err) => {
    if (err) return res.status(500).json({ erro: 'Erro ao atualizar usuário' });
    res.json({ mensagem: 'Usuário atualizado com sucesso!' });
  });
};

// Deleta os usuários
const deletarUsuario = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM usuario WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ erro: 'Erro ao deletar usuário' });
    res.json({ mensagem: 'Usuário deletado com sucesso!' });
  });
};

module.exports = { listarUsuarios, criarUsuario, atualizarUsuario, deletarUsuario };