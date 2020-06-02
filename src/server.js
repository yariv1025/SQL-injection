const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./queries');
const app_port = process.env.PORT || 3000;
const path = require('path');
const client = require("express");

//
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(bodyParser.json());


// define 'public' folder as static
// app.use(express.static("src"));


// set the views engine to ejs
app.set("view engine", "ejs")
app.set("views", path.join(__dirname + "/views"));


//Home page
app.get('/', async (req, res) => {
    // response.json({ info: 'Node.js, Express, and Postgres API' })
    res.render('pages/index');
});


// Getting user login details
// app.post('/login', (req, res) => {
//     const email = req.body.email
//     const password = req.body.password
//
//     console.log("User email is: " + email + "\nUser password is: " + password);
//
//
//     res.send("login")
// });


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



// about page
app.get('/about', function (req, res) {
    res.render('pages/about');
});


// search a user in our PGDataBase
// this function will allow us to make SQLInjection
app.get('/search', async (req, res) => {
    let results = {};
    results.row = [];
    try {
        //takes the input from the web => WRONG IDEA!!! -> we must to check
        // the input!
        const userString = req.query.search_word;
        console.log("User input is: " + userString);
        const query = `select * from users where email = '${userString}'`;
        console.log("Full query is: " + query);

        // The data we query from the DB
        results = await db.run_query(query);
        console.log(results.rows);
    } catch (e) {
        console.log("Error");
    }
    // finally {
    //     res.setHeader("content-type", "application/json")
    //     res.send(JSON.stringify(results.row));
    // }
    res.send(results.rows);
    // res.render('page/index', {results: results.rows});
});


// send the email of the user to queries.js file for deleting
app.get('/userToDelete', async (req, res) => {
    let results = {};
    results.row = [];
    try {
        const userEmail = req.query.userToDelete;
        console.log("The user " + userEmail + " will be deleted!");

        results = await db.deleteUser(userEmail);
        console.log(results);
    } catch (e) {
        console.log("Error");
    } finally {
        res.setHeader("content-type", "application/json")
        res.send(JSON.stringify(results));
    }
});

app.get('/users', db.getUsers);
app.get('/users/:pass', db.getUserByPass);
app.post('/users', db.createUser);
app.put('/users/:pass', db.updateUser);
app.delete('/users/:pass', db.deleteUser);


// Remains at the bottom of the page
app.listen(app_port);// port 3000
console.log(`app is running. port: ${app_port}`);
console.log(`http://127.0.0.1:${app_port}/`);
