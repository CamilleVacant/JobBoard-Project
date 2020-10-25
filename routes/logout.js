const express = require('express');
const logoutRouter = express.Router();
const connection = require('../connectdb');
const authController = require('../controllers/auth')

logoutRouter.get('/', authController.logout)

module.exports = logoutRouter;