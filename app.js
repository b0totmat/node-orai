import express from "express"
import sqlite3 from 'sqlite3'

const app = express()
const db = new sqlite3.Database("./database.sqlite")

/*
    User {
        id
        email
        firstName
        lastName
        address
    }
*/

let users = [
    {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      address: 'Alföldi utca 22.'
    },
    {
      firstName: "Jane",
      lastName: 'Smith',
      email: "jane.smith@example.com",
      address: 'Alföldi utca 55.'
    },
    {
      firstName: "Sam",
      lastName: 'Johnson',
      email: "sam.johnson@example.com",
      address: 'Májkrém utca 69.'
    }
]

db.serialize(() => {
    db.run("DROP TABLE IF EXISTS users")
    db.run("CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, firstName TEXT, lastName TEXT, address TEXT)")

    for (const u of users) {
        db.run("INSERT INTO users (firstName, lastName, email, address) VALUES (?, ?, ?, ?)", [u.firstName, u.lastName, u.email, u.address])
    }
})
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Szius! <3')
})

// All users
app.get('/api/users', (req, res) => {
    db.all("SELECT * FROM users", (error, data) => {
        if(error) {
            console.log(error)
        }

        res.json(data)
    })
})

// User by id
app.get('/api/users/:id', (req, res) => {
    const id = req.params.id
    
    db.get("SELECT * FROM users WHERE id = ?", [id], (error, data) => {
        if(error) {
            return res.status(500).json({error: error.message})
        }

        if(!data) {
            return res.status(404).json({error: "User not found!"})
        }
        res.status(200).json(data)
    })
})

app.listen(3000)
