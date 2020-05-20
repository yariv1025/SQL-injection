const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./queries');
const app_port = process.env.PORT || 3000;
const path = require('path');

//
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);


// set the views engine to ejs
app.set("view engine", "ejs")
app.set("views", path.join(__dirname + "/views"))

//Home page
app.get('/', (req, res) => {
    // response.json({ info: 'Node.js, Express, and Postgres API' })
    res.render('pages/index');
});


// about page
app.get('/about', function(req, res) {
    res.render('pages/about');
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
