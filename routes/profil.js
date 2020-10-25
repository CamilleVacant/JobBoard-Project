const express = require('express');
const profilRouter = express.Router();
const connection = require('../connectdb');
const authController = require('../controllers/auth')



profilRouter.get('/', authController.isLoggedIn, (req, res) => {
    if (req.user){
        res.render('profil', {model: req.user});
    } else {
            res.redirect('login');
    }
});

// Modify personnal information by user
profilRouter.post ('/', authController.isLoggedIn, (req, res) => {
        const user = [req.body.last_name, req.body.first_name, req.body.Email, req.body.pe_id]; 
        const sql = "UPDATE people SET pe_lname = ?, pe_fname = ?, pe_email = ? WHERE pe_id = ?";
        connection.query(sql, user, error => {
            if (error) throw error;
            res.redirect('profil');
         }) 
});



module.exports = profilRouter;