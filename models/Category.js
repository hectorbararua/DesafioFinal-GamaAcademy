const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  }
})

const Category = mongoose.model('Category', CategorySchema)

module.exports = Category
