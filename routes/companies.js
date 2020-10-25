const express = require('express');
const compRouter = express.Router();
const connection = require('../connectdb');
const authController = require('../controllers/auth');



// Display all companies
compRouter.get('/', authController.isAdmin, (req, res) => {
    if (req.admin === 2) {connection.query ('SELECT * FROM companies ORDER BY co_id',  [], (error, rows) => {
        if (error) throw error;
        res.render("companies", {model: rows});
    });
} else {res.redirect('/home')}
});


// Modify company information
compRouter.get ('/update_companies/:id', authController.isAdmin, (req, res) => {
    if (req.admin === 2) {const id = req.params.id;
    connection.query ('SELECT * FROM companies WHERE co_id = ?', id, (error, rows) => {
        if (error) throw error;
        res.render("update_companies", {model: rows});
    }); 
} else {res.redirect('/home')}   
})

compRouter.post ('/update_companies/:id', (req, res) => {
    const id = req.params.id;
    const company = [req.body.Name, req.body.Address, req.body.CP, req.body.City, req.body.Description, id]; 
    const sql = "UPDATE companies SET co_name = ?, co_address = ?, co_CP = ?, co_city = ?, co_description = ? WHERE co_id = ?";
    connection.query(sql, company, error => {
        if (error) throw error;
        res.redirect("/companies");
    });      
});

// Add new company
compRouter.get ("/add_companies", authController.isAdmin, (req, res) => {
    if (req.admin === 2) {res.render("add_companies", {model: {}});
} else {res.redirect('/home')}
});

compRouter.post ('/add_companies', (req, res) => {
    const company = [req.body.Name, req.body.Address, req.body.CP, req.body.City, req.body.Description]; 
    const sql = "INSERT INTO companies (co_name, co_address, co_CP, co_city, co_description) VALUES (?, ?, ?, ?, ?)"
    connection.query(sql, company, error => {
        if (error) throw error;
        res.redirect("/companies");
    });   
 });



// Delete a company
compRouter.get ('/delete_companies/:id', authController.isAdmin, (req, res) => {
    if (req.admin === 2) {const id = req.params.id;
    connection.query ('SELECT * FROM companies WHERE co_id = ?', id, (error, rows) => {
        if (error) throw error;
        res.render("delete_companies", {model: rows});
    }); 
} else {res.redirect('/home')}   
})

compRouter.post ('/delete_companies/:id', (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM companies WHERE co_id = ?";
    connection.query(sql, id, error => {
        if (error) throw error;
        res.redirect("/companies");
    });  
}); 

module.exports = compRouter;