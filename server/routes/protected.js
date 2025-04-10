const express = require('express');
const authMiddleware = require('../middlewares/auth');
const router = express.Router();

router.get('/profile', authMiddleware, (req, res) => {
  res.json({ msg: 'Perfil do usuário acessado com sucesso!', user: req.user });
});

module.exports = router;