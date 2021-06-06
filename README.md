<p align="center">
  <img width="750" height="50" src="https://i.ibb.co/yQh0gtS/Readme-photo.jpg">
</p>


# SQLInjection

This project will present you a vulnerable Website for SQL injection attacks.<br>
SQL injection is the vulnerability that results when you give an attacker the
 ability to influence the Structured Query Language (SQL) queries that an
  application passes to a back-end database.

By being able to influence what is passed to the database, the attacker can
 leverage the syntax and capabilities of SQL itself, as well as the power and
  flexibility of supporting database functionality and operating system
   functionality available to the database.

any code that accepts input from an untrusted source and then uses that input
 to form dynamic SQL statements could be vulnerable.
 
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

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://www.mit.edu/~amini/LICENSE.md) file for details

## Acknowledgments
The project was given as assignment in the "Data Security" course in "SCE
, Shamoon College of Engineering", Ashdod, Israel.
