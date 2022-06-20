import express from 'express'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { engine } from 'express-handlebars';
const app = express()
const __dirname = dirname(fileURLToPath(import.meta.url))

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');//priskiriam kur bus saugomi elementai

//Routeris
app.get('/', function (req, res) {
  if (Object.keys(req.query).length > 0) {
    console.log(req.query)
    res.redirect('http://localhost:3002')
    return
  }
  res.sendFile(__dirname + '/templates/index.html')

})
app.get('/index', function (req, res) {
  let message = ''
  if (Object.keys(req.query).length > 0) {
    console.log(req.query)
    if (req.query.login != '' &&
      req.query.password != '' &&
      req.query.login === 'admin@inv.lt' &&
      req.query.password === '1234'
    ) {
      res.redirect('http://localhost:3002/administratorius')
      return
    } else {
      message = 'Neteisingas el. pasto adresas arba slaptazodis'


    }
  }

  //res.sendFile(__dirname + '/templates/index.html')
  //Nurodome grazinama turini atgal i narsykle, turini paima is index.html

  //Handlebars turinio perdavimas
  res.render('login', { message })
})


app.get('/administratorius', function (req, res) {
  res.sendFile(__dirname + '/templates/administratorius.html')
})

app.get('/:pirma', function (req, res) {
  let pirma = req.params.pirma
  res.send('<h1>' + pirma + '</h1>') //Nurodome grazinama turini atgal i narsykle
})

app.get('/:pirma/:antra/:trecia/:ketvirta/:penkta', function (req, res) {
  let pirma = req.params.pirma
  let antra = req.params.antra
  let trecia = req.params.trecia
  let ketvirta = req.params.ketvirta
  let penkta = req.params.penkta

  res.render('person', { pirma, antra, trecia, ketvirta, penkta })
  //Nurodome grazinama turini atgal i narsykle
})





app.listen(3002) //Nurodomas portas ir inicijuojamas serveris