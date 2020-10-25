const express = require('express');
const connection = require('../connectdb');
const bcrypt = require ('bcrypt');
const jwt = require ('jsonwebtoken');
const cookieParser = require('cookie-parser');
const {promisify} = require('util');

// const jwtUtils = require('../utils/jwt.utils');
// const jwt.utils = require ('../utils/jwt.utils')


//Register auth function

exports.register = (req, res) => {
console.log(req.body);
const { pe_fname, pe_lname, pe_email, pe_password, confirm_pe_password } = req.body;


connection.query('SELECT pe_email FROM people WHERE pe_email = ?', [pe_email], async(error, results) => {
    if(error){
        console.log(error);
    }
    if( results.length > 0) {
        return res.render('register', {
            message: 'Email déjà utilisé'
        });
        
    }
    else if( pe_password !== confirm_pe_password){
        return res.render('register', {
            message: 'Les mots de passe ne correspondent pas'
        });
    }

    let hashedPassword = await bcrypt.hash(pe_password, 10);
    console.log(hashedPassword);

    connection.query('INSERT INTO people SET ?', {pe_fname: pe_fname, pe_lname: pe_lname, pe_email: pe_email, pe_password: hashedPassword, isAdmin: 0}, (err, results) => {
        if(err){
            console.log(err);
        } else {
            console.log(results)
            return res.render('login', {
                message: 'Utilisateur créé !'
            });
        }

    })
});

}


//Login auth function

exports.login = async (req, res) => {
    try {
        const { email, password} = req.body;
        if ( !email || !password) {
            return res.status(400).render('login', {
                message: "Merci d'utiliser un email et un mot de passe"
            })
        }
        connection.query('SELECT * FROM people WHERE pe_email = ?', [email], async (error, results) => {
            console.log(results);
            if( !results || !(await bcrypt.compare(password, results[0].pe_password) )) {
                res.status(401).render('login', {
                    message: 'Email ou mot de passe incorect'
                })
            } else {
                const id = results[0].pe_id;
                const isAdmin = results[0].isAdmin;
                const token = jwt.sign({ pe_id: id, isAdmin: isAdmin}, process.env.JWT_SECRET, {
                    expiresIn : process.env.JWT_EXPIRES_IN
                });

                const cookieOptions = {
                    expires: new Date (
                        Date.now()+process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                    ),
                    httpOnly : true
                }
                res.cookie('jwt', token, cookieOptions);
                return res.status(200).redirect('home')
            }
        });

    } catch (error) {
        console.log(error);
    };

}

//=========================
//=========================  Authentification User
//=========================


exports.isLoggedIn = async(req, res, next) => {
    if (req.cookies.jwt) {
/// Decodage du token
        try {
            const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);

            console.log(decoded)
/// Check if user still exist
            
            connection.query('SELECT * FROM people WHERE pe_id = ?', [decoded.pe_id], (error, result) => {
                connection.query ( "SELECT co_name, ad_title, ad_mission, ad_jobtype, ad_wage, ad_wantedprofil, DATE_FORMAT(ad_startdate, '%d/%m/%Y'), ad_id AS ad_startdate FROM companies NATURAL JOIN advertisements", [] , (error, rows) => {
                if(!result) {
                    return next();
                }

                if (decoded.isAdmin == 1){
                    res.redirect('/admin')
                }

                req.ad = rows;
                req.user = result[0];
                return next();
                });
            });

        } catch (error) {
            console.log(error);
            return next();
        }
        
    } else {
    next();
    }
}


//=========================
//=========================  Authentification Admin
//=========================


exports.isAdmin = async(req, res, next) => {
    if (req.cookies.jwt) {
/// Decodage du token
        try {
            const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);

            console.log(decoded.isAdmin);
/// Check if user still exist
                
                req.admin = decoded.isAdmin + 1;

                if(!req.admin) {
                    console.log('1 : ', decode.isAdmin)
                    return next();
                }    

                if (req.admin === 2) {
                    console.log('req.admin : ', req.admin)
                    return next();
                } else {
                    console.log('123')
                next();
                }

        } catch (error) {
            console.log('2: ',error);
            return next();
        }
        
    } else {
        console.log('123')
    next();
    }
}


//=========================
//=========================  Logout
//=========================


exports.logout = async(req, res, next) => {
    res.cookie('jwt', 'logout', {
        expires: new Date(Date.now() + 2*1000),
        httpOnly: true
    });
    res.status(200).redirect('/');
}
