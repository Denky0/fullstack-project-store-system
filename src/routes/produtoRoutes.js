const express = require('express');
const router = express.Router();
const { listarProdutos, buscarProduto, criarProduto, atualizarProduto, deletarProduto } = require('../controllers/produtoController');
const verificarToken = require('../middlewares/auth');

router.get('/', verificarToken, listarProdutos);
router.get('/:id', verificarToken, buscarProduto);
router.post('/', verificarToken, criarProduto);
router.put('/:id', verificarToken, atualizarProduto);
router.delete('/:id', verificarToken, deletarProduto);

module.exports = router;