const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const port = 3000

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})

// //main page
// app.get('/', (request, response) => {
//     response.sendFile(__dirname + '.\\view\\index.html');
// });



app.get('/users', db.getUsers)
app.get('/users/:pass', db.getUserByPass)
app.post('/users', db.createUser)
app.put('/users/:pass', db.updateUser)
app.delete('/users/:pass', db.deleteUser)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})

