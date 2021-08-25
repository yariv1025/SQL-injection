# SQL Injection Simulator

<p align="center">
  <img width="250" height="50" src="https://imagehost.imageupload.net/2020/04/27/injection.jpg">
</p>


## Background
>Description and general background:
SQL injection is a type of security exploit in which the attacker adds Structured Query Language (SQL)
code to a Web form "input box" to gain access to resources or make changes to data.

> An SQL query is a request for some action to be performed on a database.
Typically, on a Web form for user authentication, when a user enters their name and password into the
text boxes provided for them, those values are inserted into a SELECT query.
The attackers use the input boxes to send their requests to the database, which could allow them to
download the entire database or interact with it in other illicit ways.

> If a valid value entered and found as expected in the database, the user
gets access to his information.
Else, access denied.

## System objectives
>Data security is a way of protecting data against unauthorized access by
various attackers or from harming it.
The system's objectives are to present the SQL injection process, from the query injection until we interact
with the website database, and we also want to show at least one way to prevent the attack.
Also, we will create a simulator that performs vulnerability testing for websites.

## Work Details
>I am develop my project in JavaScript, HTML, and CSS languages, started with
 the construction of the database
 (Postgres DB) and continued to build the skeleton of the project.
 
>Skeleton creation includes: creating the correct folders, adding the
 required packages, use the proper technologies
 to build the site (e.g., Express, NodeJS, EJS, and more) and establishing contact with the database.
 At the end of the process, I will represent simulators on our site, which will be used to perform the
 SQL injection & injection scan vulnerabilities.

## Demonstration
#### 1) SQL Injection simulator.
    
>##### Understanding How It Happens:
>* SQL injection vulnerabilities most commonly occur when the Web application
 developer does not ensure that
values received from a Web form, cookie, input parameter, and so forth are validated or encoded before passing
them to SQL queries that will be executed on a database server.

>* If an attacker can control the input that is sent to an SQL query and
manipulate that input so that the data
is interpreted as code instead of as data, he may be able to execute code on the back-end database.

>* Without a sound understanding of the underlying database that they are
interacting with or a thorough knowledge
and awareness of the potential security issues of the code that is being developed, application developers can
often produce inherently insecure applications that are vulnerable to SQL injection.
 
 Our database contains the user’s information. The access to this information is not secure and contains a
 vulnerability in the code (on purpose of course), according to the explanation mentioned above.
 By injecting an SQL query, we exploit this loophole to gain access to data that should not be exposed to us.
 In the case of a database that contains sensitive information, for example, medical information, financial
 information, etc. , This data are exposed to the theft.
 When creating a syntactically correct statement, you may be able to terminate it and comment out the rest of the query.
 In these scenarios, and provided that the back-end database supports multiple statements, you usually can chain arbitrary
 SQL code with no restrictions, providing you with the ability to conduct attacks such as privilege escalation.
 There are several ways to prevent this attack. One of them is basically checking the input from the user.
 We go through the user's input in order to identify forbidden / illegitimate characters, which can allow the injecting
 of commands to the original command.
 If we find such characters, we replace them with meaningless characters (for the SQL language), and by doing so we prevent
 the Injection.
 
 <p align="center">
   <img width="1100" height="300" src="https://i.ibb.co/sWGkpPY/SQLInjection
   -simulator.png">
 </p>
 
* First, you sign up to the website (All users’ details will be saved in
 PostgresDB).
 You will perform registration, and you will get a “succeeded” message:
 
  <p align="center">
    <img width="800" height="100" src="https://i.ibb.co/1myssBP/1.png">
  </p>
   
  If you try to insert your details again, you will get the answer: "User already exists"
 
* Second, if you search your name in the DB, you will get the Appropriate record:
 
<p align="center">
    <img width="1100" height="100" src="https://i.ibb.co/L98YdHn/2.png">
</p>
   
   *Safe/Unsafe mode doesn’t matter here because we are inserting a legal string.
   
* Third we will perform Injection. We concatenate the string “ ‘ or ‘2
   ’ = ‘2 ” to the query, and that will return TRUE in our DB,
   a result that will cause all the existing information in the database to be exposed to us.
   
   The query that is created following the injection is:
   ```bash
   `select * from users where email = '${query_parameter}'`;     
   ```
   while query_parameter = user string.

   Now, because of the Injection, we will get:
   ```bash
   `select * from users where email = ‘ or ‘2’= ‘2`;     
   ```
  The Injection breaks the original query and creates a query that returns TRUE.
  <br>
  <br>
#### methods:
* Unsafe mode – User string not checked.
  
<p align="center">
    <img width="800" height="700" src="https://i.ibb.co/P9QqfYY/3.png">
</p>

The data can be verified by looking at our database:

<p align="center">
    <img width="800" height="700" src="https://i.ibb.co/m5zn1NY/4.png">
</p>
  
* Safe mode – user string is checked.

<p align="center">
    <img width="500" height="100" src="https://i.ibb.co/5MTMr2h/5.png">
</p>

With safe mode, we will get a blank page because we change characters that are illegitimate to meaningless characters (below in green).
The database does not understand the meaning of the injection query and, therefore, does not find a
match nor return an answer.

  ```bash
  `select * from users where email = '&#x27; or &#x27;2&#x27; = &#x27;2'`     
  ```

#### 2) Injection scanner - searches for SQL Injection vulnerabilities.
Finding SQL Injection:
* There are three key aspects for finding SQL injection vulnerabilities:
    * identifying the data entry accepted by the application.
    * modifying the value of the entry, including hazardous strings.
    * detecting the anomalies returned by the server.
    
We chose to demonstrate the third option.
SQL injection can be present in any front-end application accepting data entry from a system or user,
which is then used to access a database server.
We will focus on the Web environment, as this is the most common scenario, and we will therefore initially
be armed with just a Web browser. In a Web environment, the Web browser is a client acting as a front-end
requesting data from the user and sending them to the remote server, which will create SQL queries using
the submitted data.
Our main goal at this stage is to identify anomalies in the server response and determine whether they are
generated by a SQL injection vulnerability.

Testing by Inference - There is one simple rule for identifying SQL injection vulnerabilities: Trigger anomalies
by sending data. We will send legitimate information from an existing database and collect the information that
returns in the dictionary. The same goes for information that is illegitimate.
We take from the dictionaries the maximum values obtained and performed a calculation on both.
Depending on the size of the change, we know how to estimate the vulnerability of that website.

*Of course, we must get approval to perform the test because performing such a test requires us to load the site
with legitimate and illegitimate information. We will, therefore, perform the test solely on the site we have created.

<p align="center">
    <img width="600" height="100" src="https://i.ibb.co/ts42SJj/6.png">
</p>

* First, we insert the address of the website we want to check and press “Scan URL”. This address will be disassembled and
analyzed in order to check the vulnerability of the site. The part that appears before the question mark enters the URL variable.
The part that appears after the question mark goes into the parameters_names variable.

We will create the addresses list so that it includes the legitimate and illegitimate words in it so that we can perform the test.
>    
        Exam:
        “…inject_word=legitimate_Variable1&inject_method=Safe/unsafe”
        “…inject_word=legitimate_Variable2&inject_method=Safe/unsafe”
        Etc.
        “…inject_word=Illegitimate_Variable1&inject_method=Safe/unsafe”
        “…inject_word=Illegitimate_Variable2&inject_method=Safe/unsafe”
        Etc.
>
*We can’t concatenate anything to inject_method parameter because it has no meaning (therefore, this parameter is probably not vulnerable).

The illegitimate words are:
``` bash
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
'=', 
];
```

We also create legitimate variables and then create the legitimate words dictionary:
``` bash
const numbers = regex ([0-9]);
const characters = regex ([\w]);

const list_of_legitc_values = [
'abc@abc.com',
'abc@gmail.com',
'abc@hotmail.com',
'name@domain.com',
numbers,
characters,
];
```

* At the end the system performs the test:

<p align="center">
    <img width="800" height="200" src="https://i.ibb.co/pyPmVPd/7.png">
</p>

We can see in the above example that we have 180% of difference in the inject_word parameter.
We understand from the result that the vulnerable part of our website is the parameter inject_word, because this part allows us to perform
various manipulations by SQL injections. However, in the method_inject parameter, there is no vulnerability because the information we put
in there does not reach the database or the place that allows manipulations to be performed. If we use an address with more parameters,
they will appear in the table after the scan.

>*Because our site is intentionally written in such a way that it is vulnerable, the percentage of change for entering legitimate information
versus illegitimate information will be a large percentage. This can also be understood from the example we presented earlier in the SQL Injection
simulator. In fact, for entering a legitimate value like name@domain.com we will get a page with X characters and for an illegitimate value
like ‘or '2' = '2 we will get X * n + d characters (d = constant number, n≥1, X≥1).

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See Instructions for notes on how to deploy the project on a live system.
<br>
<br>
###### File structure
```
SQLInjection/
├── .circleci
│   └── config.yml
├──  node_modules/
├── src/
│   └── view/
│       ├── pages/
│       │   ├── about.ejs
│       │   └── inedx.ejs
│       │   └── injectionScan.ejs
│       │   └── injectionSimulation.ejs  
│       ├── partials/
│       │   └── footer.ejs  
│       │   ├── head.ejs
│       │   └── header.ejs
│       ├── injectionScanner.js
│       ├── queries.js
│       └── server.js
├── test/
│   └── Array.spec.js  
├── .eslintrc.json 
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
├── External Libraries/
└── Scratches and Consoles/
```
### Prerequisites

Firstly you need to clone this repository to your working environment by entering the command
```
git@github.com:yariv1025/SQLInjection.git
```

### Installing

You need to run the npm install command for you to be able to run this project.
(This command will download locally all the packages that's needed for the developing and running of this application.)

```
npm install
```

After this you have 2 choices:
1. write in the terminal the command: "npm run dev"
2. Add "npm running configuration" that will run the
 "dev" script that's located in:
```
~\package.json
```
 for running the local server.
 
After doing so you will be able to run the local server and access the main
 page of the app on your web browser through express server.


## Deployment

The deployment is done automatically by the Heroku service and can be
 accessed by the link below.<br>
`Heroku cloud` : https://sql-injection-sce.herokuapp.com/

## Built With

* [ExpressJS](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js
* [Bootstrap](https://getbootstrap.com/) - Open source toolkit for developing with HTML, CSS, and JS.
* [EJS](https://ejs.co/) - Embedded JavaScript templates.
* [Heroku](https://www.heroku.com/platform) - The web framework used.
* [pgAdmin](https://www.pgadmin.org/) - Advanced Open Source database. 

## Authors
* **Stav Lobel** 
* **Yariv Garala**

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://www.mit.edu/~amini/LICENSE.md) file for details

## Acknowledgments
The project was given as assignment in the "Data Security" course in "SCE
, Shamoon College of Engineering", Ashdod, Israel.
