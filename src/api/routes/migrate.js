const express = require('express');
const router = express.Router();
const { sequelize } = require('../../db/models');

router.get('/migrate', async (req, res) => {
  try {
    await sequelize.sync({ alter: true });
    res.status(200).send('Міграція виконана успішно!');
  } catch (error) {
    console.error('Помилка при міграції:', error);
    res.status(500).send('Помилка при міграції: ' + error.message);
  }
});

module.exports = router;