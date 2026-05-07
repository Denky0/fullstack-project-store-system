const db = require('../config/db');

const listarProdutos = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM produto');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar produtos' });
  }
};

const buscarProduto = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query('SELECT * FROM produto WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ erro: 'Produto não encontrado' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar produto' });
  }
};

const criarProduto = async (req, res) => {
  const { nome, quantidade, valor } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO produto (nome, quantidade, valor) VALUES ($1, $2, $3) RETURNING id',
      [nome, quantidade, valor]
    );
    res.status(201).json({ mensagem: 'Produto criado com sucesso!', id: result.rows[0].id });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao criar produto' });
  }
};

const atualizarProduto = async (req, res) => {
  const { id } = req.params;
  const { nome, quantidade, valor } = req.body;
  try {
    await db.query(
      'UPDATE produto SET nome = $1, quantidade = $2, valor = $3 WHERE id = $4',
      [nome, quantidade, valor, id]
    );
    res.json({ mensagem: 'Produto atualizado com sucesso!' });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao atualizar produto' });
  }
};

const deletarProduto = async (req, res) => {
  const { id } = req.params;
  try {
    const vendas = await db.query('SELECT * FROM venda WHERE produto = $1', [id]);
    if (vendas.rows.length > 0) {
      return res.status(400).json({ erro: 'Este produto possui movimentações registradas e não pode ser excluído!' });
    }
    await db.query('DELETE FROM produto WHERE id = $1', [id]);
    res.json({ mensagem: 'Produto deletado com sucesso!' });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao deletar produto' });
  }
};

module.exports = { listarProdutos, buscarProduto, criarProduto, atualizarProduto, deletarProduto };