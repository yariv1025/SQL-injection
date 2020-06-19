// Server initialization
const express = require('express');
const app = express();

// body-parser is a piece of express middleware that reads a form's input
// and stores it as a javascript object accessible through req.body
const bodyParser = require('body-parser');

// queries.js file
const db = require('./queries');

//This library validates and sanitizes strings only.
// Passing anything other than a string is an error.
const validator = require('validator');

// Listening to express port
const app_port = process.env.PORT || 3000;

// Including the Path module in our application
const path = require('path');


//-----------------------------------------------------------------------------


// body-parser is a piece of express middleware that reads a form's input
// and stores it as a javascript object accessible through req.body
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(bodyParser.json());


//-----------------------------------------------------------------------------


// set the views engine to ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname + "/views"));


//-----------------------------------------------------------------------------


//Home page
app.get('/', async (req, res) => {
    // response.json({ info: 'Node.js, Express, and Postgres API' })
    res.render('pages/index', {results: []});
});


// about page - FUTURE PAGE
app.get('/about', function (req, res) {
    res.render('pages/about');
});

//-----------------------------------------------------------------------------


// Sign up to the website - user data will be inserted to the DB.
app.post('/signup', async (req, res) => {
    let results = {};
    results.row = [];

    const email = req.body.email;
    const password = req.body.password;

    console.log("User email is: " + email + "\nUser password is: " + password);

    // insert the user data to the data base
    results = await db.createUser(email, password);
    console.log(results);
    res.send(results);
});


//-----------------------------------------------------------------------------


// search a user in our PGDataBase
// this function will allow us to make SQLInjection
app.get('/search', async (req, res) => {
    let results = {};
    // results.row = [];
    try {
        const search_method = req.query.search_method; //method: could be
        // equal to 'safe' || 'unsafe'

        const userString = req.query.search_word; //takes the input from the
        // web => WRONG IDEA!!!

        const escaped_userString = validator.escape(userString); //takes the
        // input from the web and check the string

        //choose our method (safe || unsafe) and perform the query
        const query_parameter = search_method === "safe" ? escaped_userString : userString;
        const query = `select * from users where email = '${query_parameter}'`;

        console.log("Full query is: " + query);
        // The data we query from the DB
        results = await db.run_query(query);
        console.log(results.rows);
    } catch (e) {
        console.log("Error");
    }

    res.render('pages/index', {results: results.rows});
});


//-----------------------------------------------------------------------------


// send the email of the user to queries.js file for deleting
app.get('/userToDelete', async (req, res) => {
    let results = {};
    results.row = [];

    const userEmail = req.query.userToDelete;
    console.log("The user " + userEmail + " will be deleted!");

    try {
        results = await db.deleteUser(userEmail);
        console.log(results);
    } catch (e) {
        console.log("Error");
    } finally {
        res.setHeader("content-type", "application/json");
        res.send(JSON.stringify(results));
    }
});


//-----------------------------------------------------------------------------


// Server listener - Remains at the bottom of the page
app.listen(app_port);// port 3000
console.log(`app is running. port: ${app_port}`);
console.log(`http://127.0.0.1:${app_port}/`);
