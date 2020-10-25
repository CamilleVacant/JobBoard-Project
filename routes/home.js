const express = require('express');
const { changeUser } = require('../connectdb');
const homeRouter = express.Router();
const connection = require('../connectdb');
const authController = require('../controllers/auth')



homeRouter.get('/', authController.isLoggedIn, (req, res) => {
      if (req.user){
            connection.query ( "SELECT co_name, ad_title, ad_mission, ad_jobtype, ad_wage, ad_wantedprofil, ad_id, co_id, DATE_FORMAT(ad_startdate, '%d/%m/%Y') AS ad_startdate FROM companies NATURAL JOIN advertisements", [] , (error, rows) => {
            if (error) throw error;
            res.render('home', {user: req.user, ad: rows})
        });
    } else {
        res.redirect('login');
    }
    
});

homeRouter.post('/', (req, res) => {
    const sql = "INSERT INTO applications (first_name, last_name, email, phone, message, ad_id, pe_id, co_id) VALUES (?,?,?,?,?,?,?,?)";
    const data = [req.body.first_name, req.body.last_name, req.body.email, req.body.phone, req.body.message, req.body.ad_id, req.body.pe_id, req.body.co_id];
    connection.query (sql, data, error => {
        if (error) throw error;
        res.redirect('/')
    });

});


module.exports = homeRouter;