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

//Injection Scanner imports
const defaultRoutes = express.Router();
const axios = require('axios');


// body-parser is a piece of express middleware that reads a form's input
// and stores it as a javascript object accessible through req.body
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(bodyParser.json());


// set the views engine to ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname + "/views"));


//---------------------------------Home-page-----------------------------------


//Home page
app.get('/', async (req, res) => {
    // response.json({ info: 'Node.js, Express, and Postgres API' })
    res.render('pages/index', {results: []});
});


//--------------------------------About-page-----------------------------------


// about page - FUTURE page
app.get('/about', function (req, res) {
    res.render('pages/about');
});


//-------------------------------Sign-up-method---------------------------------


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


//-------------------------------Inject-method---------------------------------


// Inject a user in our PGDataBase
// this function will allow us to make SQLInjection
app.get('/inject', async (req, res) => {
    let results = {};
    // results.row = [];
    try {
        const inject_method = req.query.inject_method; //method: could be
        // equal to 'safe' || 'unsafe'

        const userString = req.query.inject_word; //takes the input from the
        // web => WRONG IDEA!!!

        const escaped_userString = validator.escape(userString); //takes the
        // input from the web and check the string

        //choose our method (safe || unsafe) and perform the query
        const query_parameter = inject_method === "safe" ? escaped_userString : userString;
        const query = `select * from users where email = '${query_parameter}'`;

        console.log("Full query is: " + query);
        // The data we query from the DB
        results = await db.run_query(query);
        console.log(results.rows);
    } catch (e) {
        console.log("Error");
    }
    console.log('results.rows', results);
    res.render('pages/injectionSimulation', {results: results.rows});
});


//-----------------------------Delete-method-----------------------------------


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


//------------------------Injection-Scanner-method-----------------------------


app.get('/injectionscan', async (req, res) => {
    console.log("InjectionScan Test log");
    const url_lookup = req.query.url_lookup;

    // checking URL: if not exist->The user is informed that there is no data
    // in the database and therefore no test can be performed.
    // else->check the URL characters (legitimate / not legitimate characters).
    if (typeof url_lookup === 'undefined' || url_lookup == '') {
        res.render('pages/injectionScan', {title: 'Injection Scanner', users: 0});
    } else {
        // const numbers = regex([0-9]);
        // const characters = regex([\w,]);
        const list_of_optional_vulnerability = [
            '\' or \'a\'=\'a',
            'ghost',
            ';',
            '`',
            '&&',
            'and',
            '||',
            'select',
            'union',
            'from',
            'where',
            '*',
            '=',
        ];
        // select * from users where user like %

        const list_of_legitc_values = [
            'yariv@yariv.com',
            'stavlobel@gmail.com',
            'yariv1052@gmail.com',
            'name@domain.com',
            numbers,
            characters,
        ];

         // Decomposing the URL:
         // 1) PATH: > "http://127.0.0.1:3000/inject" - part of the address up
         // to the question mark.
        const url = url_lookup.split('?')[0];
        console.log(url);

        // 2) inject_word=yariv&inject_method=unsafe
        // ARRAY: >  ["inject_word", "inject_method"]
        const parameters_names = url_lookup.split('?')[1]
            .split('&')
            .map((parameter) => parameter.split('=')[0]);

        // creation of dictionary with the key = inject_word & inject_method
        // variables and value = illegitimate word.
        let non_lig_parameters = {};
        parameters_names.forEach((value) => {
            non_lig_parameters[value] = list_of_optional_vulnerability[0]
        });

        // creation of dictionary with the key = inject_word & inject_method
        // variables and value = legitimate word.
        let lig_parameters = {};
        parameters_names.forEach((value) => {
            lig_parameters[value] = list_of_legitc_values[0]
        });

        // function for calculating the percent difference between the results.
        const percDiff = (A, B) => 100 * Math.abs((A - B) / ((A + B) / 2));

            /*
            * The following function use the objects “vulnerability_result”
            *  & "non_vulnerability_result".
            *
            * The functions performs tests with the values from the dictionary
            * we created before and calculate the length of pages that
            * return to us for each test we made.
            *
            * “vulnerability_result” & "non_vulnerability_result" object stores this information.
            */
        let parameter_result = await parameters_names.map(async (url_param) => {

            let vulnerability_result = [];

            // calculate the length of return pages (illegitimate variables).
            list_of_optional_vulnerability.forEach((param_value) => {
                const requestResult = requestHtmlLength(url, {[url_param]: param_value});
                // console.log('request Result: ', requestResult)
                vulnerability_result.push(requestResult)
            });
            vulnerability_result = await Promise.all(vulnerability_result);

            // calculate the max results from "vulnerability_result".
            vulnerability_result = Math.max(...vulnerability_result);
            console.log('vulnerability_result', vulnerability_result);

            let non_vulnerability_result = [];

            // calculate the length of return pages (legitimate variables).
            list_of_legitc_values.forEach((param_value) => {
                const requestResult = requestHtmlLength(url, {[url_param]: param_value});
                // console.log('request Result: ', requestResult);
                non_vulnerability_result.push(requestResult);
            });
            non_vulnerability_result = await Promise.all(non_vulnerability_result);

            // calculate the max results from "non_vulnerability_result".
            non_vulnerability_result = Math.max(...non_vulnerability_result);
            console.log('non_vulnerability_result', non_vulnerability_result);

            // calculating the difference between the MAX results.
            const diff = percDiff(non_vulnerability_result, vulnerability_result);
            return {
                parameterName: url_param,
                isVulnerable:    diff > 20 ? 'Yes' : 'No',
                percent:   Math.round(diff),
            }
        });

        // rendering the results to the website.
        parameter_result = await Promise.all(parameter_result);
        console.log('parameter_result: ', parameter_result);
        res.render('pages/injectionScan', {title: 'injectionScanTool', results: parameter_result});
    }
});

// function for checking the html length.
async function requestHtmlLength(url, paramters) {
    try {
        const response = await axios.get(url, {params: paramters});
        if (response.status === 200) {
            const html = response.data;
            return html.length;
        }
        return 0;
    } catch (e) {
        console.error(e);
    }
}


//---------------------------Injection-Simulation------------------------------


app.get('/injectionSimulation', async (req, res) => {
    res.render('pages/injectionSimulation', {results: []});
});


//---------------------------Server-definitions--------------------------------


// Server listener - Remains at the bottom of the page
app.listen(app_port);// port 3000
console.log(`app is running. port: ${app_port}`);
console.log(`http://127.0.0.1:${app_port}/`);
