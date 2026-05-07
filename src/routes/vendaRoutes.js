const express = require('express');
const router = express.Router();
const { listarVendas, criarVenda, deletarVenda } = require('../controllers/vendaController');
const verificarToken = require('../middlewares/auth');

router.get('/', verificarToken, listarVendas);
router.post('/', verificarToken, criarVenda);
router.delete('/:id', verificarToken, deletarVenda);

module.exports = router;