const express = require('express');
const connexRouter = express.Router();
const connection = require('../connectdb');
const bcrypt = require ('bcrypt');
const authController = require('../controllers/auth')

connexRouter.get('/', (req, res) => {
    res.render("connexion");
});


// Login


//Register - add user informations to database



// connexRouter.post('/', async (req, res) => {
//     // if (req.body.pe_password == req.body.confirm_pe_password) {
//         const hashedPassword = await bcrypt.hash(req.body.pe_password, 10);
//         const data = [req.body.pe_fname, req.body.pe_lname, req.body.pe_email, hashedPassword];
//         const sql = "INSERT INTO people (pe_fname, pe_lname, pe_email, pe_password) VALUES (?,?,?,?)";
//         console.log(req.body);
//         console.log(hashedPassword);
//         connection.query (sql, data, error => {
//         });
//         res.redirect('/connexion')
//         message = 'Succes';
//     // }
//     // else {
//     //     throw new Error ("Password must be the same");
//     // }
// });

    
module.exports = connexRouter;