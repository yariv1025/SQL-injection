const Pool = require('pg').Pool
const pool = new Pool({
    user: 'yariv',
    host: 'localhost',
    database: 'api',
    password: 'Nikol#1805',
    port: 5432,
});


//-----------------------------------------------------------------------------


/*
 * Running the user query from the "Search engine".
 */
const run_query = async (query) => {
    let usersData;
    try {
        usersData = await pool.query(query)
    } catch (e) {
        console.log(e)
    }
    return usersData;
};


//-----------------------------------------------------------------------------


/*
 * Create a new user in the DB.
 */
const createUser = async (email, pass) => {
   let userExist;

   // Check if user already exist in our DB.
    try{
        userExist = await run_query("select * from users where email = '" + email + "' and pass = '" + pass + "'");
    }
    catch (e) {
        console.log(e);
    }

    // if user dose not exist
    if (userExist.rows.length < 1) {
        try {
            await pool.query('INSERT INTO users (email, pass)' +
                ' VALUES ($1, $2)', [email, pass]);
        } catch (e) {
            console.log(e)
        }
        return "succeeded";
    }
    //if user exist
    return "User already exists"
};


//-----------------------------------------------------------------------------


/*
 * Delete specific user.
 */
const deleteUser = async (email) => {
    let userExist;

    // Check if user already exist in our DB.
    try {
        userExist = await run_query("select * from users where email ='" + email + "'");
    } catch (e) {
        console.log(e);
    }

    // if user already exist we will delete it
    if (userExist.rows.length >= 1) {
        try {
            let queryForDelete = await pool.query('DELETE from users where' +
                ' email = $1 ', [email])
        } catch (e) {
            console.log(e)
        }
        return "User was deleted";
    }

    // if user dose not exist
    return "User dose not exist";
};


//-----------------------------------------------------------------------------


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
        //response.status(200).json(results.rows)
    })
};


//POST: in this function, we’re extracting the name and email properties from the request body, and INSERTing the values.
// inside the pool.query() we put the raw SQL that will touch the api database.
// const createUser = (request, response) => {
//      const {username, email} = request.body;
//
//     pool.query('INSERT INTO users (email, password) VALUES ($1, $2)', [username, email], (error, results) => {
//         if (error) {
//             throw error
//         }
//         // response.status(201).send(`User added with ID: ${result.insertId}`)
//     })
// };


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


// Delete a specific user by password.
// const deleteUser = (request, response) => {
//     const pass = parseInt(request.params.password)
//
//     pool.query('DELETE FROM users WHERE pass = $1', [pass], (error, results) => {
//         if (error) {
//             throw error
//         }
//         response.status(200).send(`User deleted with PASSWORD: ${pass}`)
//     })
// }

//-----------------------------------------------------------------------------


//in order to access these functions from server.js, we’ll export them.
module.exports = {
    getUsers,
    getUserByPass,
    createUser,
    updateUser,
    deleteUser,
    run_query
};
