
const Pool = require('pg').Pool
const pool = new Pool({
    user: 'yariv',
    host: 'localhost',
    database: 'api',
    password: 'Nikol#1805',
    port: 5432,
});

//GET: multi users
// inside the pool.query() we put the raw SQL that will touch the api database.
const getUsers = (request, response) => {
    let usersData = pool.query('SELECT * FROM users', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    });
    console.log(usersData);
};

//GET: single user
// inside the pool.query() we put the raw SQL that will touch the api database.
const getUserByPass = (request, response) => {
    const pass = parseInt(request.params.password)

    pool.query('SELECT * FROM users WHERE pass = $1', [pass], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

//POST: in this function, we’re extracting the name and email properties from the request body, and INSERTing the values.
// inside the pool.query() we put the raw SQL that will touch the api database.
const createUser = (request, response) => {
    const {username, email} = request.body

    pool.query('INSERT INTO users (username, email) VALUES ($1, $2)', [username, email], (error, results) => {
        if (error) {
            throw error
        }
        // response.status(201).send(`User added with ID: ${result.insertId}`)
    })
}

//PUT: for this query, we’ll combine GET and POST to use the UPDATE clause.
// inside the pool.query() we put the raw SQL that will touch the api database.
const updateUser = (request, response) => {
    //const id = parseInt(request.params.id)
    const {name, email} = request.body

    pool.query(
        'UPDATE users SET name = $1, email = $2',
        [name, email],
        (error, results) => {
            if (error) {
                throw error
            }
            //response.status(200).send(`User modified with ID: ${id}`)
        }
    )
}

//delete a specific user by password.
const deleteUser = (request, response) => {
    const pass = parseInt(request.params.password)

    pool.query('DELETE FROM users WHERE pass = $1', [pass], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`User deleted with PASSWORD: ${pass}`)
    })
}

//in order to access these functions from server.js, we’ll export them.
module.exports = {
    getUsers,
    getUserByPass,
    createUser,
    updateUser,
    deleteUser,
}
