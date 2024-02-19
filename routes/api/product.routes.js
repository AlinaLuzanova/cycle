const router = require('express').Router();
const { Product, User } = require('../../db/models');

// --------------------------------------------------------
// --------------------------------------------------------
router.route('/')

  .delete(async (req, res) => {
    const id = req.body.entryId;
    const { userId } = res.locals;

    try {
      const product = await Product.findByPk(id);
      if (!product) {
        return res.status(400).json({ error: 'The product does not exist.' });
      }
      if (product.user_id !== userId) {
        return res.status(400).json({ error: 'You do not have the rights to delete.' });
      }

      const result = await Product.destroy({ where: { id } });
      if (result) {
        return res.json({ text: 'OK' });
      }
      return res.status(500).json({ error: 'Product cannot be change' });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  })

// --------------------------------------------------------
  .put(async (req, res) => {
    const id = req.body.entryId;
    const { userId } = res.locals;

    try {
      const product = await Product.findByPk(id);
      if (!product) {
        return res.status(400).json({ error: 'The product does not exist.' });
      }
      if (product.user_id !== userId) {
        return res.status(400).json({ error: 'You do not have the rights to change.' });
      }

      const result = await Product.update(req.body, { where: { id } });
      if (result) {
        return res.json({ text: 'OK' });
      }
      return res.status(500).json({ error: 'Product cannot be deleted' });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  })

// --------------------------------------------------------
  .post(async (req, res) => {
    const { userId } = res.locals;

    try {
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(400).json({ error: 'The user does not exist.' });
      }
      if (!user.isseller) {
        return res.status(400).json({ error: 'You do not have the rights to change.' });
      }

      const data = {
        ...req.body,
        user_id: userId,
      };

      const result = await Product.create(data);
      if (result) {
        return res.json({ text: 'OK', result });
      }
      return res.status(500).json({ error: 'Product cannot be added' });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  });

// --------------------------------------------------------

module.exports = router;
