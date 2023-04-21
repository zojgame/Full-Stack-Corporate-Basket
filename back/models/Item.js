const {Schema, model} = require('mongoose')

const Item = new Schema({
    title: String,
    price: Number
})

module.exports = model('Item', Item)