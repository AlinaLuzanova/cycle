const router = require('express').Router();
const Cart = require('../../components/views/Cart');
const AddToCart = require('../../components/views/AddToCart');
const { Product } = require('../../db/models');

router.route('/').get((req, res) => {
  const { user } = res.locals;

  res.send(
    res.renderComponent(Cart, {
      title: 'Shopping Cart Page',
      user,
    }),
  );
});

router.route('/add/:id')
  .get(async (req, res) => {
    const { user } = res.locals;
    const { id } = req.params;

    try {
      const product = await Product.findByPk(id);
      return res.send(
        res.renderComponent(AddToCart, {
          title: `Add to cart item #${id}`,
          user,
          product,
        }),
      );
    } catch (error) {
      console.log(error.message);
      return res.status(400).json({ error: error.message });
    }
  });

module.exports = router;
