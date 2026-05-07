const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ erro: 'Acesso negado, token não encontrado!' });

  jwt.verify(token, process.env.JWT_SECRET, (err, usuario) => {
    if (err) return res.status(403).json({ erro: 'Token inválido ou já expirado!' });
    req.usuario = usuario;
    next();
  });
};

module.exports = verificarToken;