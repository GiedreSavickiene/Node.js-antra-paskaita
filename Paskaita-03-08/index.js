import express from 'express'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { engine } from 'express-handlebars';
import { faker } from '@faker-js/faker'
import session from 'express-session';
import multer from 'multer'


const app = express()
const upload = multer({ dest: 'uploads/' })
const __dirname = dirname(fileURLToPath(import.meta.url))

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');//priskiriam kur bus saugomi elementai

//prijungiame persiunciamu duomenu atpazinima i req.body
app.use(express.urlencoded({
  extended: false
}))

//Prijungiame sesijos konfiguracija
app.use(session({
  secret: 'authentification',
  resave: false,
  saveUninitialized: true,
}))

//Routeris
app.get('/', function (req, res) {
  if (Object.keys(req.query).length > 0) {
    console.log(req.query)
    res.redirect('http://localhost:3003')
    return
  }
  res.sendFile(__dirname + '/templates/index.html')

})
app.get('/index', function (req, res) {

  let message = req.query.message
  //tikriname ar vartotojas jau yra prisijunges
  if (req.session.loggedIn === true) {
    res.redirect('http://localhost:3003/people')
    return
  }



  //res.sendFile(__dirname + '/templates/index.html')
  //Nurodome grazinama turini atgal i narsykle, turini paima is index.html

  //Atvaizduojme prisijungimo sablona su kintamuoju
  res.render('login', { message })
})

app.post('/index', function (req, res) {
  let message = 'Iveskite prisijungimo duomenis'

  if (Object.keys(req.body).length > 0) {
    console.log(req.query)
    if (req.body.login != '' &&
      req.body.password != '' &&
      req.body.login === 'admin@inv.lt' &&
      req.body.password === '1234'
    ) {
      req.session.loggedIn = true
      req.session.userName = 'admin@inv.lt'
      res.redirect('http://localhost:3003/people')
      return
    } else {
      message = "Neteisingi duomenys"
    }
  }

  res.redirect('http:/localhost:3003/index/?message=' + message)
})


app.get('/people', function (req, res) {

  //req.session.userName = null panaikinam savo kintamaji
  //req.session.destroy() sugriaunam visa sesija
  // req.session.loggedIn = null //sunaikinam sesija

  if (req.session.loggedIn) {
    faker.setLocale('lv'); //metodas kuris vardus parenka pagal tautybes

    let zmones = []
    for (let i = 0; i < 100; i++) {
      zmones.push(
        {
          zmogus: faker.name.findName(),
          adresas: faker.address.city(),
          telefon: faker.phone.phoneNumber()

        }
      )
    }
    res.render('people', { zmones, user: req.session.userName })

  } else {

    res.redirect('/index')
  }

})
//Atsijungimo nuoroda
app.get('/logout', function (req, res) {
  req.session.loggedIn = null
  req.session.userName = null
  res.redirect('/index')
})
//post uploud
app.post('/post-upload', upload.single('photo'), function (req, res) {
  //Informacija apie perduodama faila
  console.log(req.file)

  if (req.body.post_title === undefined ||
    req.body.post_content === undefined ||
    req.body.date === undefined
  ) {
    res.send('Uzpildyti ne visi laukeliai')
    return
  }

  res.send(req.body)
})

//Image uploud
app.post('/image-upload', upload.single('photo'), function (req, res) {
  //Informacija apie perduodama faila
  console.log(req.file)
  if (req.body.post_title === undefined ||
    req.body.post_content === undefined ||
    req.body.date === undefined
  ) {
    res.send('Nera tokio laukelio')
    return
  }

  res.send(req.body)
})
app.listen(3003) //Nurodomas portas ir inicijuojamas serveris