import express from 'express'
import sqlite3 from 'sqlite3'

const app = express(),
      db  = new sqlite3.Database('./database.sqlite')

/*
    Product {
        id
        name
        description
        picture
        price
    }
*/

const testData = [
    {
        id: 1,
        name: 'Tej',
        description: 'Moooo',
        picture: 'https://www.fda.gov/files/standard_milk_ordinance_centennial_1600x900.png',
        price: '300 Ft'
    },
    {
        id: 2,
        name: 'Gumikesztyű',
        description: 'Ez most mocskos lesz!',
        picture: 'https://images-fibreglast-com.s3.amazonaws.com/pio-resized/750/Latex%20Gloves-1.jpg',
        price: '1250 Ft'
    },
    {
        id: 3,
        name: 'Pulóver',
        description: 'Meg ne fagyj!',
        picture: 'https://image-resizing.booztcdn.com/julesweaters/jul22orga15_cgreen_1.webp?has_grey=1&has_webp=1&dpr=2.5&size=w400',
        price: '3590 Ft'
    }
]

db.serialize(() => {
    db.run('DROP TABLE IF EXISTS products')
    db.run('CREATE TABLE products (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, description TEXT, picture TEXT, price TEXT)')

    for(const p of testData) {
        db.run(
            'INSERT INTO products (name, description, picture, price) VALUES (?, ?, ?, ?)',
            [p.name, p.description, p.picture, p.price]
        )
    }
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

// Get product by id
app.get('/products/:id', (req, res) => {
    db.get('SELECT * FROM products WHERE id = ?', req.params.id, (err, data) => {
        if(err) {
            return res.status(500).json({ message: err.message })
        }
        if(!data) {
            return res.status(404).json({ message: `Failed to find product with the id of ${req.params.id}.` })
        }
        
        res.status(200).json(data)
    })
})

app.listen(3000)
