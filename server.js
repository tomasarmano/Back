import express from 'express';
const PORT=8080;

const app=express();
import productsRouter from './routes/products.js';
import cartsRouter from './routes/carts.js';


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.get('/',(req,res)=> {
    res.setHeader('Content-Type','text/plain');
    res.status(200).send('OK');
})

const server=app.listen(PORT, ()=>{
    console.log(`Server escuchando un puerto ${PORT}`);
});

