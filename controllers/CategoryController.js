const { Category } = require('../models/Index')

module.exports = class CategoryController {
  static async register(req, res) {
    try {
      const { name } = req.body
      // validations - validação
      if (!name) throw new Error('O  nome é obrigatório')

      const nameExists = await Category.findOne({ name })

      if (nameExists) throw new Error('Por favor, Utilize outro nome!')

      const category = new Category({
        name
      })

      const NewCategory = await category.save()

      res.status(200).json(NewCategory)
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  }

  static async listCategories(req, res) {
    try {
      const list = await Category.find()

      res.status(200).json(list)
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  }

  static async updateCategory(req, res) {
    try {
      const { id } = req.params

      const { name } = req.body
      if (!name) throw new Error('O  nome é obrigatório')

      const update = await Category.findByIdAndUpdate(id, { name })

      res.status(201).json({ message: 'Categoria atualizada com sucesso!' })
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  }
  static async deleteCategory(req, res) {
    try {
      const { id } = req.params

      const deletar = await Category.findByIdAndRemove(id)
      if (!deletar) throw Error('Categoria não encontrado')

      res.json({ message: 'Categoria excluida com sucesso!' })
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  }
}
