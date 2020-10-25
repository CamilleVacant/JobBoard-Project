const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cookieParser = require ('cookie-parser')
const dotenv = require('dotenv')


// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

//Parse URL-encoded
app.use(express.urlencoded({ extended: false}));
app.use(express.json());
app.use(cookieParser());

// parse requests of content-type - application/json
app.use(bodyParser.json())

// listen for requests
app.listen(8080, () => {
    console.log("Server is listening on port 8080");
});

// Connect to database
const connection = require('./connectdb');

// Routes

const adminRouter = require ('./routes/admin');
const connexRouter = require ('./routes/connexion');
const registerRouter = require ('./routes/register');
const loginRouter = require ('./routes/login');
const homeRouter = require ('./routes/home');
const logoutRouter = require ('./routes/logout');
const userApplRouter = require ('./routes/userApplications');
const profilRouter = require ('./routes/profil');
const compRouter = require ('./routes/companies');
const adRouter = require ('./routes/advertisements');
const peoRouter = require ('./routes/people');
const appRouter = require ('./routes/applications');


dotenv.config({ path : './.env'})

// app.use('/', );
app.use('/admin', adminRouter);
app.use('/connexion', connexRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/home', homeRouter);
app.use('/logout', logoutRouter);
app.use('/userApplications', userApplRouter);
app.use('/profil', profilRouter);
app.use('/companies', compRouter);
app.use('/advertisements', adRouter);
app.use('/people', peoRouter);
app.use('/applications', appRouter);




// app.use url encoded
app.use(express.urlencoded({ extended: false}))


// set the view engine to ejs
app.set("view engine", "ejs");
app.set("views", [__dirname + "/views/partials", __dirname + "/views/pages/advertisements", __dirname + "/views/pages/people", __dirname + "/views/pages/companies", __dirname + "/views/pages/index", __dirname+"/views/pages/admin", __dirname+"/views/pages/connexion", __dirname+"/views/pages/register", __dirname+"/views/pages/login", __dirname+"/views/pages/home", __dirname+"/views/pages/logout", __dirname+"/views/pages/profil", __dirname+"/views/pages/userApplications", __dirname+"/views/pages/applications"]);


// lien static css
app.use(express.static("style"));




//get companies data for index
app.get('/', (req, res) => {
    connection.query ( "SELECT co_name, ad_title, ad_mission, ad_jobtype, ad_wage, ad_wantedprofil, ad_id, co_id, DATE_FORMAT(ad_startdate, '%d/%m/%Y') AS ad_startdate FROM companies NATURAL JOIN advertisements", [] , (error, rows) => {
        if (error) throw error;
        res.render('index', {model: rows})
    });

});


//Post form to database
app.post('/', (req, res) => {
    const sql = "INSERT INTO applications (first_name, last_name, email, phone, message, ad_id, co_id) VALUES (?,?,?,?,?,?,?)";
    const data = [req.body.first_name, req.body.last_name, req.body.email, req.body.phone, req.body.message, req.body.ad_id, req.body.co_id];
    connection.query (sql, data, error => {
        if (error) throw error;
        res.redirect('/')
    });

});
