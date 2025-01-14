import express from 'express';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 8080;

import { engine } from 'express-handlebars';
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const httpServer = app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
const io = new Server(httpServer);

const readFile = (filePath) => {
  try {
    const data = fs.readFileSync(path.join(__dirname, filePath), 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error al leer el archivo ${filePath}:`, error);
    return [];
  }
};

const writeFile = (filePath, data) => {
  try {
    fs.writeFileSync(path.join(__dirname, filePath), JSON.stringify(data, null, 2));
  } catch (error) {
    console.error(`Error al escribir en el archivo ${filePath}:`, error);
  }
};

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

  socket.on('disconnect', () => {
    console.log('Un cliente se desconectó');
  });
});
