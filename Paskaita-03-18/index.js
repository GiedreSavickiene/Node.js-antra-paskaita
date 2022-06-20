import { readFile, writeFile } from 'fs'
import express from 'express'

const app = express()


const database = './people.json'

// readFile(database, 'utf8', (err, data) => {
//     let jsonData = JSON.parse(data)


//     jsonData.forEach((el) => {
//         // console.log(jsonData)
//         // console.log(el.gender)
//         if (el.gender === 'male') {
//             el.favoriteFruit = 'apelsinai'
//         } else if (el.gender === 'female') {
//             el.favoriteFruit = 'vysnios'
//         }


//     })

//     writeFile(database, JSON.stringify(jsonData), 'utf8', function (err) {
//         if (err) {
//             console.log('Failas neirasytas')
//         } else {
//             console.log('Failas irasytas')
//         }
//     })

// })

app.get('/edit-person/:id', (req, res) => {
    let id = req.params.id

    readFile(database, 'utf8', (err, data) => {
        if (err) {
            res.send('nepavko perskaityti failo')
            return
        }

        const person = JSON.parse(data)
        // console.log(jsonData)


        const jsonId = person.findIndex((el) => el.id == id)

        let exists = false

        person.forEach((element) => {
            if (element.id == id) {
                let jsonString = JSON.stringify([element])

                writeFile(database, jsonString, 'utf8', function (err) {
                    if (err) {
                        res.send('Failas neirasytas')

                    } else {
                        res.send('Failas irasytas')

                    }
                })
                exists = true
            }
        })
        if (!exists) {
            res.send('tokio iraso nera')
        }

    })


})

app.get('/edit-person/:id/:name', (req, res) => {
    let id = req.params.id
    let name = req.params.name
    let persons = []

    readFile(database, 'utf8', (err, data) => {
        if (err) {
            res.send('nepavko perskaityti failo')
            return
        }

        const person = JSON.parse(data)
        // console.log(jsonData)


        const jsonId = person.findIndex((el) => el.id == id)

        if (jsonId === -1) {
            res.send('nepavyko rasti elemento su tokiu id');
            return
        } else {
            person[jsonId].name = name
            persons.push(person[jsonId]);
        }

        writeFile(database, JSON.stringify(persons), 'utf8', (err) => {
            if (!err) {
                res.send('Visi elementai istrinti, vardas pakeistas')
                return
            } else {
                console.log(err)
            }
        })
    })


})

app.listen(3004)
