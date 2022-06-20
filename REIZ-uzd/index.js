import { writeFile, readFile, existsSync } from 'fs'
import express from 'express'
import { engine } from 'express-handlebars';
import chalk from 'chalk'

const app = express()
const database = './database.json'



app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.urlencoded({
    extended: false
}))

app.use('/assets', express.static('assets'))



app.get('/country-list', (req, res) => {

    readFile(database, 'utf8', (err, data) => {
        let jsonData = JSON.parse(data)

        // console.log(jsonData)
        // res.json(jsonData)
        res.render('country-list', { jsonData })

        jsonData.forEach((el) => {

            console.log(el.name)

        })
    })





})







app.listen(3004)



