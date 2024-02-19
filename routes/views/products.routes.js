const router = require('express').Router();
const EditItem = require('../../components/views/EditItem');
const AddNewItem = require('../../components/views/AddNewItem');
const ProductsList = require('../../components/views/ProductsList');
const { Product } = require('../../db/models');

router.route('/').get(async (req, res) => {
  const { user } = res.locals;

  try {
    const products = await Product.findAll();
    return res.send(
      res.renderComponent(ProductsList, {
        title: 'Products List Page',
        user,
        products,
      }),
    );
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ error: error.message });
  }
});

router.route('/new')
  .get(async (req, res) => {
    const { user } = res.locals;

    try {
      return res.send(
        res.renderComponent(AddNewItem, {
          title: 'Add new product item',
          user,
        }),
      );
    } catch (error) {
      console.log(error.message);
      return res.status(400).json({ error: error.message });
    }
  });

router.route('/:id')
  .get(async (req, res) => {
    const { id } = req.params;
    const { user } = res.locals;

    try {
      const product = await Product.findByPk(id);
      return res.send(
        res.renderComponent(EditItem, {
          title: `Edit product item #${id}`,
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
