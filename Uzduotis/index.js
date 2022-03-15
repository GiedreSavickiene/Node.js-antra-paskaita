import { writeFile, readFile, access } from 'fs'
import express from 'express'
import { engine } from 'express-handlebars';

const app = express()
const database = './database.json'



app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.urlencoded({
    extended: false
}))


//JSON.parse() - issifruoja JSON stringa irn ji konvertuoja i javascript objekta
//JSON.stringyfy() - konvertuoja objekta i stringa JSON formatu

//Cia tikriname ar failas yra ar nera
app.get('/check-file', (req, res) => {
    access(database, (err) => {
        if (err) {
            console.log("Failo nepavyko surasti")
        } else {
            console.log('Failas sekmingai surastas')
        }
    })
})


app.get('/add-user', (req, res) => {
    res.render('add-user')
})

app.post('/add-user', (req, res) => {
    if (Object.keys(req.body).length > 0) {
        //Tikriname ar suvesti teisingi prisijungimo duomenys
        if (req.body.name === '' ||
            req.body.surname === '' ||
            req.body.tlf === '' ||
            req.body.email === '' ||
            req.body.adres === ''
        ) {

            res.render('add-user', { message: 'Neteisingai užpildyti duomenys' })
            return

        } else {

            let masyvas = []

            access(database, (err) => {

                if (err) {

                    masyvas.push(req.body)

                    writeFile(database, JSON.stringify(masyvas), 'utf8', (err) => {
                        if (!err) {
                            console.log('Failas sekmingai issaugotas')
                        } else {
                            console.log(err)
                        }
                    })

                } else {

                    readFile(database, 'utf8', (err, data) => {
                        let dataArray = JSON.parse(data)

                        dataArray.push(req.body)

                        writeFile(database, JSON.stringify(dataArray), 'utf8', (err) => {
                            if (!err) {
                                console.log('Failas sekmingai issaugotas')
                            } else {
                                console.log(err)
                            }
                        })

                    })
                }
            })

        }

    }
})


app.listen(3004)



