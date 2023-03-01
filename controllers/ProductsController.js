const { Product } = require('../models/Index')

module.exports = class ProductsController {
  static async register(req, res) {
    try {
      const { name, images, price, description, categoryid } = req.body

      const product = new Product({
        name,
        images: req.file.filename,
        price,
        description,
        categoryid
      })

      const NewProduct = await product.save()

      res.status(201).json(NewProduct)
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  }

  static async listProducts(req, res) {
    try {
      const lists = await Product.find().populate('categoryid')

      res.status(200).json(lists)
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  }

  static async listProduct(req, res) {
    try {
      const { id } = req.params
      const list = await Product.findById(id).populate('categoryid')

      res.status(200).json(list)
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  }

  static async updateProduct(req, res) {
    try {
      const { id } = req.params
      const { name, images, price, description, categoryid } = req.body

      const updated = await Product.findByIdAndUpdate(id, {
        name,
        images: req.file.filename,
        price,
        description,
        categoryid
      })
      res.json({ message: 'Produto atualizado com sucesso!' })
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  }

  static async deleteProducts(req, res) {
    try {
      const { id } = req.params

      const deleteProduct = await Product.findByIdAndDelete(id)

      res.json({ message: 'Produto deletado com sucesso!' })
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  }
}
