import express from 'express'
import orders from '../models/orders.js'
import products from '../models/products.js'

const Router = express.Router()

Router.get('/get-orders', async (req, res) => {
    let list = await orders.find()
    let index = 0;

    for (let order of list) {
        const product = await products.findOne({ _id: order.product })
        if (product)
            list[index].product = product.product_name

        //list[index].productPrice = product.discount_price ? product.discount_price : product.price
        index++
    }

    res.json(list)
})

Router.post('/save-order', async (req, res) => {
    const newOrder = new orders(req.body)
    newOrder.save()
    res.send(req.body)
})

Router.delete('/delete-orders/:id', async (req, res) => {
    const id = req.params.id
    // posts.findByIdAndDelete(id).exec()
    // posts.find((err, data) => {
    //     if (err)
    //         return console.log(err)

    //     res.json(data)


})

export default Router
