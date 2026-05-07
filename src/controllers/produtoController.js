const db = require('../config/db');

// Listar todos os produtos
const listarProdutos = (req, res) => {
  db.query('SELECT * FROM produto', (err, results) => {
    if (err) return res.status(500).json({ erro: 'Erro ao buscar produtos' });
    res.json(results);
  });
};

// Buscar os produtos pelo id
const buscarProduto = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM produto WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ erro: 'Erro ao buscar produto' });
    if (results.length === 0) return res.status(404).json({ erro: 'Produto não encontrado' });
    res.json(results[0]);
  });
};

// Cria os produtos
const criarProduto = (req, res) => {
  const { nome, quantidade, valor } = req.body;
  db.query('INSERT INTO produto (nome, quantidade, valor) VALUES (?, ?, ?)', [nome, quantidade, valor], (err, results) => {
    if (err) return res.status(500).json({ erro: 'Erro ao criar produto' });
    res.status(201).json({ mensagem: 'Produto criado com sucesso!', id: results.insertId });
  });
};

// Atualiza os produtos
const atualizarProduto = (req, res) => {
  const { id } = req.params;
  const { nome, quantidade, valor } = req.body;
  db.query('UPDATE produto SET nome = ?, quantidade = ?, valor = ? WHERE id = ?', [nome, quantidade, valor, id], (err) => {
    if (err) return res.status(500).json({ erro: 'Erro ao atualizar produto' });
    res.json({ mensagem: 'Produto atualizado com sucesso!' });
  });
};

// Deleta os produtos
const deletarProduto = (req, res) => {
  const { id } = req.params;

  db.query('SELECT * FROM venda WHERE produto = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ erro: 'Erro ao verificar movimentações' });

    if (results.length > 0) {
      return res.status(400).json({ erro: 'Este produto possui movimentações registradas e não pode ser excluído!' });
    }

    db.query('DELETE FROM produto WHERE id = ?', [id], (err) => {
      if (err) return res.status(500).json({ erro: 'Erro ao deletar produto' });
      res.json({ mensagem: 'Produto deletado com sucesso!' });
    });
  });
};

module.exports = { listarProdutos, buscarProduto, criarProduto, atualizarProduto, deletarProduto };