const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { authValidation } = require('../validations/authValidation');
const validateData = require('../middlewares/validationMiddleware');
const authController = require('../controllers/authController');

// Endpoint per la registrazione di un nuovo utente
router.post('/register', [
    body('username').notEmpty().withMessage(authValidation.username.notEmpty.errorMessage),
    body('email').notEmpty().withMessage(authValidation.email.notEmpty.errorMessage).isEmail().withMessage(authValidation.email.isEmail.errorMessage),
    body('password').notEmpty().withMessage(authValidation.password.notEmpty.errorMessage),
    validateData // Middleware per eseguire la validazione
], authController.registerUser);

// Endpoint per il login di un utente
router.post('/login', [
    body('username').notEmpty().withMessage(authValidation.username.notEmpty.errorMessage),
    body('password').notEmpty().withMessage(authValidation.password.notEmpty.errorMessage),
    validateData // Middleware per eseguire la validazione
], authController.loginUser);

module.exports = router;
