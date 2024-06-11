const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Endpoint per ottenere tutti gli utenti
router.get('/', userController.getAllUsers);

module.exports = router;
