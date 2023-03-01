const mongoose = require('mongoose')

const OrdersProductSchema = new mongoose.Schema({
  productsId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  },
  amount: {
    type: Number,
    require: true
  },
  price: {
    type: Number,
    require: true
  }
})
const OrdersProduct = mongoose.model('OrdersProduct', OrdersProductSchema)

module.exports = OrdersProduct
