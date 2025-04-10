const express = require('express');
const Freelancer = require('../models/Freelancer');
const router = express.Router();

// Rota para cadastrar um freelancer
router.post('/add', async (req, res) => {
  try {
    const { name, skills } = req.body;
    const freelancer = new Freelancer({ name, skills });
    await freelancer.save();
    res.status(201).json(freelancer);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao adicionar freelancer' });
  }
});

// Rota para obter todos os freelancers
router.get('/', async (req, res) => {
  try {
    const freelancer = await Freelancer.find();
    res.json(freelancer);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar freelancers' });
  }
});

// Rota para deletar um freelancer por ID
router.delete('/:id', async (req, res) => {
  try {
    await Freelancer.findByIdAndDelete(req.params.id);
    res.json({ message: 'Freelancer removido com sucesso' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao deletar freelancer' });
  }
});

module.exports = router;