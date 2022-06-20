import { writeFile, mkdir, readFile } from 'fs'
import express from 'express'
//import { engine } from 'express-handlebars';

const app = express()
const database = './database/data.json'

// app.engine('handlebars', engine());
// app.set('view engine', 'handlebars');
// app.set('views', './views');

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}


app.get('/create-file', function (req, res) {

    mkdir('./database', function (err) {

        let masyvas = []

        for (let i = 0; i < 101; i++) {
            masyvas.push(rand(1, 110))
            console.log(masyvas)
        }
        writeFile(database, JSON.stringify(masyvas), 'utf8', function (err) {
            if (!err) {
                res.send('Failas sekmingai issaugotas')
                return
            } else {
                res.send('Klaida')
                return
            }
        })

    })
    res.send(masyvas)

})

app.get('/check-file', (req, res) => {

    readFile(database, 'utf8', (err, data) => {
        let number = JSON.parse(data)
        let result = number.filter(num => (num % 2) === 0)
        console.log(result)
        res.json(result)

    })


})

//JSON.parse() - issifruoja JSON stringa irn ji konvertuoja i javascript objekta
//JSON.stringyfy() - konvertuoja objekta i stringa JSON formatu

app.listen(3004)



