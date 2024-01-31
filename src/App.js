const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const productRouter = require('./routes/api/productsRouter');
const cartsRouter = require('./routes/api/cartsRouter');
const viewsRouter = require('./routes/viewsRouter');
const { connectToDB } = require('./dao/Dao');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuraciones y middlewares
configureApp();

// Conexión a la base de datos
connectToDB();

// Rutas
app.use('/api/products', productRouter);
app.use('/api/carts', cartsRouter);
app.use('/views', viewsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Funciones de configuración
function configureApp() {
  app.use(bodyParser.json());
  app.use(express.static('public'));
}