const express = require('express')

const app = express()
const conn = require('./db/conn')

const handleError = require('./helpers/handleError')

// Models
const {
  User,
  Product,
  Category,
  Orders,
  OrdersProduct
} = require('./models/Index')

// Config JSON
app.use(express.json())

app.use(
  express.urlencoded({
    extended: true
  })
)

// Public Images
app.use(express.static('public'))

// routes
const ProductsRoutes = require('./routes/ProductsRoutes')
const UserRoutes = require('./routes/UserRoutes')
const CategoryRoutes = require('./routes/CategoryRoutes')
const CardRoutes = require('./routes/CardRoutes')

app.use('/products', ProductsRoutes)
app.use('/users', UserRoutes)
app.use('/category', CategoryRoutes)
app.use('/card', CardRoutes)

app.use(handleError)

app.listen(5000)
