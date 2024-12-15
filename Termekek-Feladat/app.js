import express from 'express'
import sqlite3 from 'sqlite3'

const app = express(),
      db  = sqlite3.Database('./database.sqlite')

/*
    Product {
        id
        name
        description
        picture
        price
    }
*/

db.serialize(() => {
    db.run('DROP TABLE IF EXISTS products')
    db.run('CREATE TABLE products (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, description TEXT, picture TEXT, price TEXT)')
})

app.use(express.json())

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

app.listen(3000)
