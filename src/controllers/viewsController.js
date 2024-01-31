const viewsController = {
    getProductsView: async (req, res) => {
      try {
        // Lógica para renderizar la vista de productos
        const products = await Product.find(); // Reemplaza "Product" con tu modelo de productos
        res.render('products', { products });
      } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
      }
    },
  
    getCartView: async (req, res) => {
      try {
        // Lógica para obtener productos del carrito desde la base de datos
        const cart = await Cart.findById(/* El ID del carrito que deseas mostrar */).populate('products');
        const cartProducts = cart ? cart.products : []; // Si el carrito no existe, muestra un array vacío
  
        res.render('carts', { cartProducts });
      } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
      }
    },
  };
  
  module.exports = viewsController;