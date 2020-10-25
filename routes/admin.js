const express = require('express');
const adminRouter = express.Router();
const connection = require('../connectdb');
const authController = require('../controllers/auth');


//get companies data for admin
adminRouter.get('/', authController.isAdmin, (req, res) => {

    console.log('2 : ', req.admin)

    if (req.admin === 2) {connection.query ("SELECT co_name, ad_title, ad_mission, ad_jobtype, ad_wage, ad_wantedprofil, ad_id, co_id, DATE_FORMAT(ad_startdate, '%d/%m/%Y') AS ad_startdate FROM companies NATURAL JOIN advertisements", [] , (error, rows) => {
        if (error) throw error;
        res.render('admin', {model: rows})
    });
    } else {

    console.log('4 : ', req.admin)
        res.redirect('home');
    }
});


module.exports = adminRouter;
