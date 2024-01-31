const ProductManager = require('../dao/managers/ProductManager');

const productController = {
  getProducts: async (req, res) => {
    const { limit = 10, page = 1, sort, query } = req.query;

    try {
      // Construye la consulta según los parámetros recibidos
      const filter = query ? { category: query } : {};
      const sortOptions = sort ? { price: sort === 'asc' ? 1 : -1 } : {};

      // Realiza la consulta paginada y ordenada
      const result = await ProductManager.getProducts(filter, page, limit, sortOptions);

      // Calcula la información de paginación
      const totalPages = Math.ceil(result.totalProducts / limit);
      const hasPrevPage = page > 1;
      const hasNextPage = page < totalPages;
      const prevLink = hasPrevPage ? `/api/products?limit=${limit}&page=${page - 1}` : null;
      const nextLink = hasNextPage ? `/api/products?limit=${limit}&page=${page + 1}` : null;

      // Respuesta con el formato especificado
      res.json({
        status: 'success',
        payload: result.products,
        totalPages,
        prevPage: hasPrevPage ? page - 1 : null,
        nextPage: hasNextPage ? page + 1 : null,
        page,
        hasPrevPage,
        hasNextPage,
        prevLink,
        nextLink,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
  },
  
  // Otros métodos del controlador...
};

module.exports = productController;