<p align="center">
  <img width="250" height="50" src="https://imagehost.imageupload.net/2020/04/27/injection.jpg">
</p>


# SQLInjection

This project will present you a vulnerable Website for SQL injection attacks.

SQL injection is a type of security exploit in which the attacker adds Structured Query Language (SQL) code to a Web form input box to gain access to resources or make changes to data.
An SQL query is a request for some action to be performed on a database.
Typically, on a Web form for user authentication, when a user enters their name and password into the text boxes provided for them, those values are inserted into a SELECT query.
If the values entered are found as expected, the user is allowed access.
if they aren’t found, access is denied. [Nevon](https://nevonprojects.com/sql-injection-prevention/)

`<link>` : https://sql-injection-sce.herokuapp.com/

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

####File structure
```
SQLInjection/
├── .circleci
│   └── config.yml
├──  node_modules/
├── src/
│   └── view/
│       ├── pages/
│       │   └── inedx.ejs  
│       ├── partials/
│       │   └── footer.ejs  
│       │   ├── head.ejs
│       │   └── header.ejs
│       ├── queries.js
│       └── server.js
├── test/
│   └── Array.spec.js  
├── .eslintrc.json 
├── .gitignore
├── package.json
├── package-lock.json
├── queries.js
├── README.md
├── External Libraries/
│   ├── bootstrap/
│   ├── Node.js Core Consoles
│   └── 
└── Scratches and Consoles
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

After this you need to add "npm running configuration" that will run the "dev" script that's located on this location for running the local server
```
~\package.json
```
After doing so you will be able to run the local server and access the main page of the app on your web browser.


## Deployment

The deployment is done automatically by heroku service and can be accessed by this link.

## Built With

* [ExpressJS](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js
* [Bootstrap](https://getbootstrap.com/) - Open source toolkit for developing with HTML, CSS, and JS.
* [Heroku](https://www.heroku.com/platform) - The web framework used.
* .etc

## Authors
* **Stav Lobel** 
* **Yariv Garala**

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://www.mit.edu/~amini/LICENSE.md) file for details

## Acknowledgments
The project was given as assignment in the "Data Security" course in "SCE
, Shamoon College of Engineering", Ashdod, Israel.