const express = require('express');
const adRouter = express.Router();
const connection = require('../connectdb');
const authController = require('../controllers/auth');




// Display all advertisements
adRouter.get('/', authController.isAdmin, (req, res) => {
    if (req.admin === 2) {connection.query ("SELECT ad_id, ad_title, DATE_FORMAT(ad_pubdate, '%d/%m/%Y') AS ad_pubdate, DATE_FORMAT(ad_startdate, '%d/%m/%Y') AS ad_startdate, ad_mission, ad_jobtype, ad_wage, ad_wantedprofil FROM advertisements ORDER BY ad_id",  [], (error, rows) => {
        if (error) throw error;
        res.render("advertisements", {model: rows});
    });   
} else {res.redirect('/home')} 
});


// Modify advertisements information
adRouter.get ('/update_advertisements/:id', authController.isAdmin, (req, res) => {
    if (req.admin === 2) {const id = req.params.id;
    connection.query ("SELECT ad_title, DATE_FORMAT(ad_pubdate, '%d/%m/%Y') AS ad_pubdate, DATE_FORMAT(ad_startdate, '%d/%m/%Y') AS ad_startdate, ad_mission, ad_jobtype, ad_wage, ad_wantedprofil, ad_id FROM advertisements WHERE ad_id = ?", id, (error, rows) => {
        if (error) throw error;
        res.render("update_advertisements", {model: rows});
    });    
} else {res.redirect('/home')}
})

adRouter.post ('/update_advertisements/:id', (req, res) => {
    const id = req.params.id;
    const advert = [req.body.Title, new Date(req.body.Pubdate), new Date(req.body.Startdate), req.body.Mission, req.body.Jobtype, req.body.Wage, req.body.Wantedprofil, id]; 
    const sql = "UPDATE advertisements SET ad_title = ?, ad_pubdate = ?, ad_startdate = ?, ad_mission = ?, ad_jobtype = ? , ad_wage = ?, ad_wantedprofil = ? WHERE ad_id = ?";
    connection.query(sql, advert, error => {
        if (error) throw error;
        res.redirect("/advertisements");
    });    

});

// Add new advertisement
adRouter.get ("/add_advertisements", authController.isAdmin, (req, res) => {
    if (req.admin === 2) {connection.query ("SELECT co_id, co_name FROM companies ORDER BY co_id", [] , (error, rows) => {
        if (error) throw error;
        res.render("add_advertisements", {model: rows});
    });
} else {res.redirect('/home')}
});

adRouter.post ('/add_advertisements', (req, res) => {
const advert = [req.body.Title, new Date(req.body.Pubdate), new Date(req.body.Startdate), req.body.Mission, req.body.Jobtype, req.body.Wage, req.body.Wantedprofil, req.body.Company]; 
    const sql = "INSERT INTO advertisements (ad_title, ad_pubdate, ad_startdate, ad_mission, ad_jobtype, ad_wage, ad_wantedprofil, co_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    connection.query(sql, advert, error => {
        if (error) throw error;
        res.redirect("/advertisements");
    });   
 });



// Delete an advertisement
adRouter.get ('/delete_advertisements/:id' , authController.isAdmin, (req, res) => {
    if (req.admin === 2) {const id = req.params.id;
    connection.query ('SELECT * FROM advertisements WHERE ad_id = ?', id, (error, rows) => {
        if (error) throw error;
        res.render("delete_advertisements", {model: rows});
    });   
} else {res.redirect('/home')} 
})

adRouter.post ('/delete_advertisements/:id', (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM advertisements WHERE ad_id = ?";
    connection.query(sql, id, error => {
        if (error) throw error;
        res.redirect("/advertisements");
    });  
}); 





module.exports = adRouter;

