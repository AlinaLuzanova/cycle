const router = require('express').Router();

const mainRouter = require('./views/main.routes');
const authViewRouter = require('./views/auth.routes');
const authAPIRouter = require('./api/auth.routes');
const cartViewRouter = require('./views/cart.routes');
const productsViewRouter = require('./views/products.routes');
const productsAPIRouter = require('./api/product.routes');

// View
router.use('/', mainRouter);
router.use('/auth', authViewRouter);
router.use('/cart', cartViewRouter);
router.use('/products', productsViewRouter);
// router.use('/products', productsRouter);
// router.use('/cart', cartRouter);

// API
router.use('/api/auth', authAPIRouter);
router.use('/api/products', productsAPIRouter);
// router.use('/api/files', filesAPIRouter);

module.exports = router;
