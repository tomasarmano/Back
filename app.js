const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
require('dotenv').config();

const productRoutes = require('./src/routes/products.routes');
const cartRoutes = require('./src/routes/carts.routes');
const viewsRoutes = require('./src/routes/views.routes');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);
app.use('/', viewsRoutes);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB conectado'))
  .catch(err => console.error('Error al conectar con MongoDB:', err));

module.exports = app;
