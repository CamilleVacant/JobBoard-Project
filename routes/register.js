const express = require('express');
const registerRouter = express.Router();
const connection = require('../connectdb');
const bcrypt = require ('bcrypt');
const authController = require('../controllers/auth')

registerRouter.get('/', (req, res) => {
    res.render("register");
});

registerRouter.post('/', authController.register)

module.exports = registerRouter;