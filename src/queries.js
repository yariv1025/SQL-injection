//---------------------DataBase connection initialize--------------------------
// First we will import the Pool Class from the pg module:
const Pool = require('pg').Pool;

// Then, let's create a new pool object:
const pool = new Pool({
    user: 'yariv',
    host: 'localhost',
    database: 'api',
    password: 'Nikol#1805',
    port: 5432,
});


//------------------------General-Running-Query-method-------------------------


/*
 * Running the user query from the "Inject engine".
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


//----------------------------User-Creation-method-----------------------------


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


//----------------------------User-Delete-method-------------------------------


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


//---------------------------##FUTURE FEATURE##--------------------------------


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


//---------------------------##FUTURE FEATURE##--------------------------------


//PUT: for this query, we’ll combine GET and POST to use the UPDATE clause.
// inside the pool.query() we put the raw SQL that will touch the api database.
const updateUser = (request, response) => {
    //const id = parseInt(request.params.id)
    const {name, email} = request.body;

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
};


//---------------------------##FUTURE FEATURE##--------------------------------


//GET: multi users
// inside the pool.query() we put the raw SQL that will touch the api database.
const getUsers = (request, response) => {
    let usersData = pool.query('SELECT * FROM users', (error, results) => {
        if (error) {
            throw error
        }
        // response.status(200).json(results.rows)
    });
    console.log(usersData);
};


//----------------------------------Exports------------------------------------


//in order to access these functions from server.js, we’ll export them.
module.exports = {
    getUsers,
    getUserByPass,
    createUser,
    updateUser,
    deleteUser,
    run_query
};
