import express from 'express'
import cors from 'cors'
import { readFile } from 'fs'

const app = express()

app.use(cors())

let database = './order.json'

app.get('/', (req, res) => {

    readFile(database, 'utf8', (err, data) => {
        const json = JSON.parse(data)
        console.log(json)

        if (!err) {
            res.json({ data: json, status: 'success' })

        } else {
            res.json({ status: 'failed' })
        }
    })
})

app.listen(5001, () => {
    console.log('Serveris veikia')
})

