const express = require('express');
const http = require('http');
const handlebars = require('express-handlebars');
const socketIO = require('socket.io');
const fs = require('fs');
const productRouter = require('./ProductRouter');
const cartRouter = require('./CartRouter');
const mongoose = require('mongoose');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const port = 8080;

mongoose.connect('mongodb+srv://<fernandocba1530>:<T3Q8Rnm437JTI0Eg>@cluster0.mongodb.net/ecommerce', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on('error', (err) => {
    console.error('Error de conexión a MongoDB:', err.message);
  });
// Configurar Handlebars
app.engine(
    'handlebars',
    handlebars({
        layoutsDir: __dirname + '/views/layouts',
        defaultLayout: 'main',
        partialsDir: __dirname + '/views/partials',
    })
);
app.set('view engine', 'handlebars');
app.set('views', './views');

// Configurar el servidor de socket.io
io.on('connection', (socket) => {
    console.log('Usuario conectado');

    // Ejemplo: emitir un mensaje a todos los clientes cuando se crea un nuevo producto
    socket.on('newProduct', (product) => {
        io.emit('updateProducts', product);
    });

});

// Función para obtener la lista de productos desde el archivo JSON
function getProductsFromFile() {
    try {
        // Lee el contenido del archivo products.json
        const data = fs.readFileSync('products.json', 'utf8');
        // Parsea el contenido del archivo JSON
        const products = JSON.parse(data);
        return products;
    } catch (error) {
        console.error('Error al leer el archivo products.json:', error.message);
        return [];
    }
}

// Configurar rutas
app.use(express.json());
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);

// Ruta para la vista home
app.get('/', (req, res) => {
    // Obtiene la lista de productos
    const products = getProductsFromFile();
    // Renderiza la vista home con la lista de productos
    res.render('home', { products });
});

// Ruta para la vista realTimeProducts
app.get('/realtimeproducts', (req, res) => {
    // Obtiene la lista de productos
    const products = getProductsFromFile();
    // Renderiza la vista realTimeProducts con la lista de productos
    res.render('realTimeProducts', { products });
});

// Iniciar el servidor
server.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});

process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log('Conexión a MongoDB cerrada');
      process.exit(0);
    });
  });