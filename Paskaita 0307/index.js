import express from 'express'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
const app = express()
const __dirname = dirname(fileURLToPath(import.meta.url))

//Routeris
app.get('/', function (req, res) {
  if (Object.keys(req.query).length > 0) {
    console.log(req.query)
    res.redirect('http://localhost:3001')
    //metodas kuris nunulina duomens parasytus virsuje kai paspaudi mygruka Siusti
    return
    //skirtas tam, nes negalima kelis kartus siusti response
  }
  // console.log(req.query) // query-paima visus duomenis, kurie surasyti inter.puslapyje ir perkrovus puslapi, jie atvaizduojami konsoleje

  res.sendFile(__dirname + '/templates/index.html')
  //Nurodome grazinama turini atgal i narsykle, turini paima is index.html
})

// app.get('/:skaicius', function (req, res) {
//   let skaicius = req.params.skaicius
//   res.send('<h1>' + skaicius + '</h1>') //Nurodome grazinama turini atgal i narsykle
// })

// app.get('/:skaicius/:tekstas', function (req, res) {
//   let skaicius = req.params.skaicius
//   let tekstas = req.params.tekstas
//   res.send('<h1>' + skaicius + tekstas + '</h1>') //Nurodome grazinama turini atgal i narsykle
// })

app.get('/:pirma', function (req, res) {
  let pirma = req.params.pirma
  res.send('<h1>' + pirma + '</h1>') //Nurodome grazinama turini atgal i narsykle
})

app.get('/:pirma/:antra/:trecia/:ketvirta', function (req, res) {
  let pirma = req.params.pirma
  let antra = req.params.antra
  let trecia = req.params.trecia
  let ketvirta = req.params.ketvirta

  res.render('sablon', { pirma, antra, trecia, ketvirta })
  //Nurodome grazinama turini atgal i narsykle
})



app.listen(3001) //Nurodomas portas ir inicijuojamas serveris