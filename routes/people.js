const express = require('express');
const peoRouter = express.Router();
const connection = require('../connectdb');
const authController = require('../controllers/auth');
const bcrypt = require('bcrypt');


// Display all people
peoRouter.get('/', authController.isAdmin, (req, res) => {
    if (req.admin === 2) {connection.query ('SELECT * FROM people ORDER BY pe_id',  [], (error, rows) => {
        if (error) throw error;
        res.render("people", {model: rows});
    });  
} else {res.redirect('/home')} 
});


// Modify people information
peoRouter.get ('/update_people/:id', authController.isAdmin, (req, res) => {
    if (req.admin === 2) {const id = req.params.id;
    connection.query ('SELECT * FROM people WHERE pe_id = ?', id, (error, rows) => {
        if (error) throw error;
        res.render("update_people", {model: rows});
    });   
} else {res.redirect('/home')}  
})

peoRouter.post ('/update_people/:id', (req, res) => {
    const id = req.params.id;
    const advert = [req.body.LastName, req.body.FirstName, req.body.Email, req.body.password, id]; 
    const sql = "UPDATE people SET pe_lname = ?, pe_fname = ?, pe_email = ?, pe_password = ? WHERE pe_id = ?";
    connection.query(sql, advert, error => {
        if (error) throw error;
        res.redirect("/people");
    });      

});

// Add new person
peoRouter.get ("/add_people", authController.isAdmin, (req, res) => {
    if (req.admin === 2) {res.render("add_people");
} else {res.redirect('/home')} 
});
peoRouter.post ('/add_people', async(req, res) => {
    let hashedPassword = await bcrypt.hash(req.body.password, 10);
    const advert = [req.body.LastName, req.body.FirstName, req.body.Email, hashedPassword]; 
    const sql = "INSERT INTO people (pe_lname, pe_fname, pe_email, pe_password) VALUES (?, ?, ?, ?)";
    connection.query(sql, advert, error => {
        if (error) throw error;
        res.redirect("/people");
    });   
 });



// Delete a person
peoRouter.get ('/delete_people/:id', authController.isAdmin, (req, res) => {
    if (req.admin === 2) {const id = req.params.id;
    connection.query ('SELECT * FROM people WHERE pe_id = ?', id, (error, rows) => {
        if (error) throw error;
        res.render("delete_people", {model: rows});
    });   
} else {res.redirect('/home')}  
})

peoRouter.post ('/delete_people/:id', (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM people WHERE pe_id = ?";
    connection.query(sql, id, error => {
        if (error) throw error;
        res.redirect("/people");
    });  
}); 


module.exports = peoRouter;