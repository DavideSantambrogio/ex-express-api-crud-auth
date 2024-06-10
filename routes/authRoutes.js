const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');

// Rotte per la registrazione e il login degli utenti
router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;
