const db = require('../config/db');

// Listar todas as vendas
const listarVendas = (req, res) => {
  const sql = `
    SELECT venda.id, produto.nome AS produto, venda.data, venda.operacao, venda.quantidade
    FROM venda
    JOIN produto ON venda.produto = produto.id
    ORDER BY venda.data DESC
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ erro: 'Erro ao buscar vendas' });
    res.json(results);
  });
};

// Criar venda
const criarVenda = (req, res) => {
  const { produto, data, operacao, quantidade } = req.body;

  if (!quantidade || quantidade <= 0) {
    return res.status(400).json({ erro: 'Quantidade inválida' });
  }

  // Busca a quantidade atual do produto
  db.query('SELECT quantidade FROM produto WHERE id = ?', [produto], (err, results) => {
    if (err) return res.status(500).json({ erro: 'Erro ao buscar produto' });
    if (results.length === 0) return res.status(404).json({ erro: 'Produto não encontrado' });

    const quantidadeAtual = results[0].quantidade;

    // Se for saída verifica se tem estoque suficiente
    if (operacao === 'saida' && quantidadeAtual < quantidade) {
      return res.status(400).json({ erro: `Estoque insuficiente! Quantidade disponível: ${quantidadeAtual}` });
    }

    const novaQuantidade = operacao === 'entrada'
      ? quantidadeAtual + parseInt(quantidade)
      : quantidadeAtual - parseInt(quantidade);

    // Registra a movimentação
    db.query('INSERT INTO venda (produto, data, operacao, quantidade) VALUES (?, ?, ?, ?)',
      [produto, data, operacao, quantidade], (err, results) => {
        if (err) return res.status(500).json({ erro: 'Erro ao registrar movimentação' });

        // Atualiza a quantidade do produto
        db.query('UPDATE produto SET quantidade = ? WHERE id = ?', [novaQuantidade, produto], (err) => {
          if (err) return res.status(500).json({ erro: 'Erro ao atualizar estoque' });
          res.status(201).json({ mensagem: 'Movimentação registrada com sucesso!', id: results.insertId });
        });
      });
  });
};

// Deletar venda
const deletarVenda = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM venda WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ erro: 'Erro ao deletar venda' });
    res.json({ mensagem: 'Venda deletada com sucesso!' });
  });
};

module.exports = { listarVendas, criarVenda, deletarVenda };