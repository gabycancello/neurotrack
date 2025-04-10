const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();

// Rota de registro de usuário
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
  
    try {
      let user = await User.findOne({ email });
  
      if (user) {
        return res.status(400).json({ msg: 'Usuário já existe' });
      }
  
      user = new User({
        name,
        email,
        password,
      });
  
      // Criptografar senha antes de salvar
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
  
      await user.save();
  
      const payload = {
        user: {
          id: user.id,
        },
      };
  
      jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
  
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Erro no servidor');
    }
  });

// Rota de login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: 'Usuário não encontrado' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: 'Senha incorreta' });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro do servidor');
  }
});

module.exports = router;