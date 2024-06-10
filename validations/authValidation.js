const { body } = require('express-validator');

const authValidation = {
    username: {
        in: ['body'],
        notEmpty: {
            errorMessage: 'Username is required.',
            bail: true
        },
        isString: {
            errorMessage: 'Username must be a string.',
            bail: true
        },
        isLength: {
            options: { min: 3 },
            errorMessage: 'Username must be at least 3 characters long.'
        }
    },
    email: {
        in: ['body'],
        notEmpty: {
            errorMessage: 'Email is required.',
            bail: true
        },
        isEmail: {
            errorMessage: 'Invalid email format.'
        }
    },
    password: {
        in: ['body'],
        notEmpty: {
            errorMessage: 'Password is required.',
            bail: true
        },
        isLength: {
            options: { min: 6 },
            errorMessage: 'Password must be at least 6 characters long.'
        }
    }
};

module.exports = {
    authValidation,
};
