const router = require('express').Router();
const Home = require('../../components/Home');

router.route('/').get((req, res) => {
  const { user } = res.locals;

  res.send(
    res.renderComponent(Home, {
      title: 'Main Page',
      user,
    }),
  );
});

module.exports = router;
