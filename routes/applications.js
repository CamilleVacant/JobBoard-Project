const express = require('express');
const appRouter = express.Router();
const connection = require('../connectdb');
const authController = require('../controllers/auth');


// Display all applications
appRouter.get('/', authController.isAdmin, (req, res) => {
    if (req.admin === 2) {connection.query ('SELECT * FROM applications AS ap JOIN advertisements AS ad ON (ap.ad_id = ad.ad_id) JOIN companies AS c ON (ap.co_id = c.co_id) ORDER BY app_id',  [], (error, rows) => {
        if (error) throw error;
        res.render("applications", {model: rows});
    });        } else {

    console.log('4 : ', req.admin)
        res.redirect('home');
    }
});



module.exports = appRouter;
