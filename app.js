import express from 'express';
import { engine } from 'express-handlebars';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import productRoutes from './src/routes/products.routes.js';
import cartRoutes from './src/routes/carts.routes.js';
import viewsRoutes from './src/routes/views.routes.js';

dotenv.config();

const app = express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);
app.use('/', viewsRoutes);

mongoose.connect(process.env.MONGO_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
  })
  .then(() => console.log('✅ Conectado a MongoDB Atlas'))
  .catch(err => {
    console.error('❌ Error al conectar con MongoDB:', err);
    process.exit(1);
  });
  
export default app;
