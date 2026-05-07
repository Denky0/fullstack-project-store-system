const db = require('../config/db');
const bcrypt = require('bcrypt');

const listarUsuarios = async (req, res) => {
  try {
    const result = await db.query('SELECT id, nome, email FROM usuario');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar usuários' });
  }
};

const criarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;
  try {
    const hash = await bcrypt.hash(senha, 10);
    const result = await db.query(
      'INSERT INTO usuario (nome, email, senha) VALUES ($1, $2, $3) RETURNING id',
      [nome, email, hash]
    );
    res.status(201).json({ mensagem: 'Usuário criado com sucesso!', id: result.rows[0].id });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao criar usuário' });
  }
};

const atualizarUsuario = async (req, res) => {
  const { id } = req.params;
  const { nome, email } = req.body;
  try {
    await db.query(
      'UPDATE usuario SET nome = $1, email = $2 WHERE id = $3',
      [nome, email, id]
    );
    res.json({ mensagem: 'Usuário atualizado com sucesso!' });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao atualizar usuário' });
  }
};

const deletarUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM usuario WHERE id = $1', [id]);
    res.json({ mensagem: 'Usuário deletado com sucesso!' });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao deletar usuário' });
  }
};

module.exports = { listarUsuarios, criarUsuario, atualizarUsuario, deletarUsuario };