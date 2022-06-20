import express from "express"
import mongoose from 'mongoose'
import cors from 'cors'

const app = express()

app.use(cors())

app.use(express.json())

app.use(express.urlencoded({
    extended: false
}))

//                                 sukurtos duonbazes pavadinimas
mongoose.connect('mongodb://localhost/facebook', (err) => {
    if (!err)
        console.log('Prisijungimas prie DB pavyko')
});

//shcemos DB sukurimas, inicijuojamas po viena karta kiekvienai kolekcijai(lentelei)
const postsShema = new mongoose.Schema({
    content: String,
    data: Date
})

//shcemos priskyrimas i modeli, inicijuojamas su auksciau aprasytu kodu
const posts = mongoose.model('post', postsShema)

//naujo iraso sukurimas is issaugojimas DB
const newPosts = new posts()
newPosts.content = 'Test'
newPosts.data = '2022-03-20'
newPosts.save()

app.get('/show-data', (req, res) => {
    posts.find((err, data) => {
        if (err)
            return console.log(err)

        res.json(data)

    })
})

app.delete('/delete-data/:id', (req, res) => {
    let id = req.params.id
    posts.findByIdAndDelete(id).exec()
    posts.find((err, data) => {
        if (err)
            return console.log(err)

        res.json(data)

    })
})

app.post('/save-data', (req, res) => {

    if (req.body.content == '' ||
        req.body.data == ''
    ) {
        res.send('Uzpildykite duomenis')

    } else {
        const newPosts = new posts()
        newPosts.content = req.body.content
        newPosts.data = req.body.data
        newPosts.save()
        res.send('Duomenys uzpildyti sekmingai')
    }


})

app.put('/edit-data/:id', (req, res) => {
    let id = req.params.id
    let contents = req.body.content

    let post = posts.findByIdAndUpdate(id, { content: contents })
        .then(data => {
            res.json(data)
            console.log('Irasas atnaujintas')
        })
})




let post = posts.findByIdAndUpdate('6245c8d6c3ecab66862e1c68', {
    content: 'Programiskai paredaguotas tekstas'
})
    .then(data => {
        console.log('Irasas sekmingai atnaujintas')
    })
// post.content = "Programiskai paredaguotas tekstas"
// post.save()

// console.log(post)

app.listen(5001, () => {
    console.log('Serveris veikia')
})
