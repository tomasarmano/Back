import express from 'express';
import { Server } from 'socket.io';
import path from 'path';  

const app = express();
const PORT = 8080;

import { engine } from 'express-handlebars';
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

const httpServer = app.listen(PORT, () => {
  console.log(`Server escuchando en puerto ${PORT}`);
});
const io = new Server(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import productsRouter from './routes/products.js';
import cartsRouter from './routes/carts.js';
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.get('/', (req, res) => {
  const products = readFile('productos.json');  
  res.render('home', { products });
});

app.get('/realtimeproducts', (req, res) => {
  const products = readFile('productos.json');
  res.render('realTimeProducts', { products });
});

io.on('connection', (socket) => {
  console.log('Un cliente se conectó');

  socket.on('newProduct', (product) => {
    const products = readFile('productos.json');
    products.push(product);
    writeFile('productos.json', products);
    io.emit('productListUpdated', products);  
  });

  socket.on('deleteProduct', (productId) => {
    let products = readFile('productos.json');
    products = products.filter(p => p.id !== productId);
    writeFile('productos.json', products);
    io.emit('productListUpdated', products);  
  });
});

app.get('/', (req, res) => {
  res.send('OK');
});