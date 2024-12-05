import express from "express"
import bodyParser from "body-parser"

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Szius! <3')
})

app.listen(3000)
