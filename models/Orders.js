const mongoose = require('mongoose')

const OrdersSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  priceTotal: {
    type: Number,
    required: true
  },
  OrdersProductId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'OrdersProduct'
    }
  ]
})

const Orders = mongoose.model('Orders', OrdersSchema)

module.exports = Orders
