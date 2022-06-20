import express from 'express'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
const app = express()
const __dirname = dirname(fileURLToPath(import.meta.url))

//Routeris
app.get('/', function (req, res) {
  //Req - Request Gaunama uzklausa
  //Res - Response, tai ka graziname atgal
  res.sendFile(__dirname + '/templates/index.html') //Nurodome grazinama turini atgal i narsykle
})

app.get('/istorija', function (req, res) {
  //Req - Request Gaunama uzklausa
  //Res - Response, tai ka graziname atgal
  res.sendFile(__dirname + '/templates/istorija.html') //Nurodome grazinama turini atgal i narsykle
})

app.get('/karjera', function (req, res) {
  //Req - Request Gaunama uzklausa
  //Res - Response, tai ka graziname atgal
  res.sendFile(__dirname + '/templates/karjera.html') //Nurodome grazinama turini atgal i narsykle
})

app.get('/kontaktai', function (req, res) {
  //Req - Request Gaunama uzklausa
  //Res - Response, tai ka graziname atgal
  res.sendFile(__dirname + '/templates/kontaktai.html') //Nurodome grazinama turini atgal i narsykle
})

app.get('/rekvizitai', function (req, res) {
  //Req - Request Gaunama uzklausa
  //Res - Response, tai ka graziname atgal
  res.sendFile(__dirname + '/templates/rekvizitai.html') //Nurodome grazinama turini atgal i narsykle
})







app.listen(3000) //Nurodomas portas ir inicijuojamas serveris