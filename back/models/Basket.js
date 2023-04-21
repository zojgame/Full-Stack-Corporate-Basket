const {Schema, model} = require('mongoose')

const Basket = new Schema({
    first_owner: {type: String, ref: 'User', required: true},
    basket_name: {type: String, required: true},
    owners: [{type: String, ref: 'User', required: true}],
    items: [{price: {type: Number, required: true}, title: {type: String, required: true}}],
    public : {type: Boolean, default: true}
})

module.exports = model('Basket', Basket);