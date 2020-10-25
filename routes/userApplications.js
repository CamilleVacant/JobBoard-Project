const express = require('express');
const userApplRouter = express.Router();
const connection = require('../connectdb');
const authController = require('../controllers/auth')

userApplRouter.get('/', authController.isLoggedIn, (req, res) => {
    if (req.user){
        sql = 'SELECT * FROM applications JOIN (people, companies, advertisements) ON (people.pe_id=applications.pe_id AND companies.co_id=applications.co_id AND advertisements.ad_id=applications.ad_id) WHERE people.pe_id = ?'
        connection.query (sql, [req.user.pe_id], (error, rows) => {
            if(error) {throw error;}
               else if (!rows.length) {                                                   
                res.render("userApplications", {message: "Vous n'avez encore jamais candidaté."});
              } 
              res.render("userApplications", {model: rows});;
              console.log(req.user.pe_id);
              
        });    
    
    } else {
        res.redirect('login');
    }
})



module.exports = userApplRouter;

// SELECT * FROM applications AS ap JOIN people AS pe ON pe.pe_id = ap.pe_id AND pe.pe_id = ? JOIN advertisements AS ad ON ad.ad_id = ap.ad_id JOIN companies AS co ON ap.co_id = co.co_id', [id], (error, rows) => {