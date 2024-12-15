import express from 'express'
import sqlite3 from 'sqlite3'

const app = express()

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

app.listen(3000)
