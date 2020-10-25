const express = require('express');
const loginRouter = express.Router();
const connection = require('../connectdb');
const bcrypt = require ('bcrypt');
const authController = require('../controllers/auth')

loginRouter.get('/', (req, res) => {
    res.render('login');
});

loginRouter.post('/', authController.login)

module.exports = loginRouter;