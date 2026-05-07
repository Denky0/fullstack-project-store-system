const db = require('../config/db');

const listarVendas = async (req, res) => {
  try {
    const result = await db.query(`
      SELECT venda.id, produto.nome AS produto, venda.data, venda.operacao, venda.quantidade
      FROM venda
      JOIN produto ON venda.produto = produto.id
      ORDER BY venda.data DESC
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar vendas' });
  }
};

const criarVenda = async (req, res) => {
  const { produto, data, operacao, quantidade } = req.body;

  if (!quantidade || quantidade <= 0) {
    return res.status(400).json({ erro: 'Quantidade inválida' });
  }

  try {
    const produtoResult = await db.query('SELECT quantidade FROM produto WHERE id = $1', [produto]);

    if (produtoResult.rows.length === 0) {
      return res.status(404).json({ erro: 'Produto não encontrado' });
    }

    const quantidadeAtual = produtoResult.rows[0].quantidade;

    if (operacao === 'saida' && quantidadeAtual < quantidade) {
      return res.status(400).json({ erro: `Estoque insuficiente! Quantidade disponível: ${quantidadeAtual}` });
    }

    const novaQuantidade = operacao === 'entrada'
      ? quantidadeAtual + parseInt(quantidade)
      : quantidadeAtual - parseInt(quantidade);

    await db.query(
      'INSERT INTO venda (produto, data, operacao, quantidade) VALUES ($1, $2, $3, $4)',
      [produto, data, operacao, quantidade]
    );

    await db.query('UPDATE produto SET quantidade = $1 WHERE id = $2', [novaQuantidade, produto]);

    res.status(201).json({ mensagem: 'Movimentação registrada com sucesso!' });

  } catch (err) {
    res.status(500).json({ erro: 'Erro ao registrar movimentação' });
  }
};

const deletarVenda = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM venda WHERE id = $1', [id]);
    res.json({ mensagem: 'Venda deletada com sucesso!' });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao deletar venda' });
  }
};

module.exports = { listarVendas, criarVenda, deletarVenda };