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


//JSON.parse() - issifruoja JSON stringa irn ji konvertuoja i javascript objekta
//JSON.stringyfy() - konvertuoja objekta i stringa JSON formatu

//Cia tikriname ar failas yra ar nera
app.get('/check-file', (req, res) => {
    if (existsSync(database)) {
        console.log(chalk.green('Failas egzistuoja'))
        res.send('failas egzistuoja')

    } else {
        console.log(chalk.red('failo nera'))
        res.send('failo nera')
    }
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

            res.render('add-user', { message: 'Neteisingai užpildyti duomenys', status: 'red' })
            return

        } else {

            if (existsSync(database)) {

                //Jeigu failas yra

                readFile(database, 'utf8', (err, data) => {
                    let dataArray = JSON.parse(data)

                    //paskutinto elemento atvaizdavimas
                    //dataArray.length - 1


                    //auto icrement
                    req.body.id = dataArray[dataArray.length - 1].id + 1

                    dataArray.push(req.body)

                    writeFile(database, JSON.stringify(dataArray), 'utf8', (err) => {
                        if (!err) {
                            res.render('add-user', { message: 'Failas sekmingai issaugotas', status: 'green' })
                            return

                        } else {
                            console.log(err)
                        }
                    })

                })

            } else {

                //Jeigu failo nera

                let masyvas = []

                req.body.id = 0

                masyvas.push(req.body)

                writeFile(database, JSON.stringify(masyvas), 'utf8', (err) => {
                    if (!err) {
                        res.render('add-user', { message: 'Failas sekmingai issaugotas', status: 'green' })
                        return

                    } else {
                        console.log(err)
                    }
                })

            }

        }

    }
})

//Vartotojo redagavimas
app.get('/edit-user/:id', (req, res) => {
    let id = req.params.id

    readFile(database, 'utf8', (err, data) => {
        if (err) {
            res.send('nepavko perskaityti failo')
            return
        }

        const json = JSON.parse(data)

        const jsonId = json.findIndex((el) => el.id == id)

        if (jsonId === -1) {
            res.send('Nepavyko rasti tokio elemento')
            return
        }

        res.render('edit-user', { data: json[jsonId] })
    })
})

app.post('/edit-user/:id', (req, res) => {

    let id = req.params.id

    if (Object.keys(req.body).length > 0) {
        //Tikriname ar suvesti teisingi prisijungimo duomenys
        if (req.body.name === '' ||
            req.body.surname === '' ||
            req.body.tlf === '' ||
            req.body.email === '' ||
            req.body.adres === ''
        ) {

            res.render('edit-user', { message: 'Neteisingai užpildyti duomenys', status: 'red' })
            return

        } else {



            //Jeigu failas yra

            readFile(database, 'utf8', (err, data) => {
                let dataArray = JSON.parse(data)

                const jsonId = dataArray.findIndex((el) => el.id == id)

                if (jsonId === -1) {
                    res.send('Nepavyko rasti tokio elemento')
                    return
                }
                req.body.id = id

                dataArray[jsonId] = req.body



                writeFile(database, JSON.stringify(dataArray), 'utf8', (err) => {
                    if (!err) {
                        res.redirect('/')
                        return

                    } else {
                        console.log(err)
                    }
                })

            })

        }
    }

})

app.delete('/:id', (req, res) => {
    let id = req.params.id

    readFile(database, 'utf8', (err, data) => {
        if (err) {
            res.send('nepavko perskaityti failo')
            return
        }

        //issifruojame JSON info atgal i javascript
        const json = JSON.parse(data)

        const jsonId = json.findIndex((el) => el.id == id)

        if (jsonId === -1) {
            res.send('Nepavyko rasti tokio elemento')
            return
        }

        json.splice(jsonId, 1)

        let jsonString = JSON.stringify(json)

        writeFile(database, jsonString, 'utf8', (err) => {
            if (err) {
                res.send('Nepavylo irasyti failo')
            } else {
                res.send('Failas sekmingai issaugotas')
            }
        })


    })
})

app.get('/', (req, res) => {

    readFile(database, 'utf8', (err, data) => {
        let jsonData = JSON.parse(data)

        console.log(jsonData)
        // res.json(jsonData)
        res.render('sablonas', { jsonData })
    })



})

app.listen(3004)



