const { Product, Orders, OrdersProduct } = require('../models/Index')
const getToken = require('../helpers/get-token')
const decodedToken = require('../helpers/token-decoded')

module.exports = class CardController {
  static async lists(req, res) {
    try {
      const sales = await Orders.find().populate('OrdersProductId')

      res.status(200).json(sales)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  static async listById(req, res) {
    try {
      const { id } = req.params

      const sale = await Orders.findById(id).populate('OrdersProductId')
      res.status(200).json(sale)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
  static async create(req, res) {
    try {
      let itens = []
      let pricetotal = 0

      const token = getToken(req)
      const decoded = decodedToken(token)

      await Promise.all(
        req.body.product.map(async product => {
          const p = await Product.findById(product.productsId)

          pricetotal += p.price * product.amount

          const newItem = new OrdersProduct({
            productsId: product.productsId,
            amount: product.amount,
            price: product.price
          })

          const item = await newItem.save()

          itens.push(item)
        })
      )

      const newsale = new Orders({
        userId: decoded.id,
        priceTotal: pricetotal,
        OrdersProductId: itens
      })

      const sale = await newsale.save()

      res.status(201).json(sale)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params

      const v = await Orders.findById(id)

      Promise.all(
        v.OrdersProductId.map(async ordersProductId => {
          await OrdersProduct.findByIdAndDelete(ordersProductId.toString())
        })
      )

      await Orders.findByIdAndDelete(id)

      res.status(204).json()
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
}
