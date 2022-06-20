import express from 'express'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { engine } from 'express-handlebars';
import { faker } from '@faker-js/faker'
import session from 'express-session';
const app = express()
const __dirname = dirname(fileURLToPath(import.meta.url))

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');//priskiriam kur bus saugomi elementai

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
  console.log(req.session)
  let message = ''
  if (Object.keys(req.query).length > 0) {
    console.log(req.query)
    if (req.query.login != '' &&
      req.query.password != '' &&
      req.query.login === 'admin@inv.lt' &&
      req.query.password === '1234'
    ) {
      req.session.loggedIn = true
      req.session.userName = 'admin@inv.lt'
      res.redirect('http://localhost:3003/people')
      return
    } else {
      message = "Neteisingi duomenys"
    }
  }



  //res.sendFile(__dirname + '/templates/index.html')
  //Nurodome grazinama turini atgal i narsykle, turini paima is index.html

  //Handlebars turinio perdavimas
  res.render('login', { message })
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


app.listen(3003) //Nurodomas portas ir inicijuojamas serveris