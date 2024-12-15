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

// All products
app.get('/products', (req, res) => {
    db.all('SELECT * FROM products', (err, data) => {
        if(err) {
            return res.status(500).json({ message: err.message })
        }
        res.status(200).json(data)
    })
})

app.listen(3000)
