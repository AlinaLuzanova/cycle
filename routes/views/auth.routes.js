const router = require('express').Router();
const Register = require('../../components/views/Register');
const Login = require('../../components/views/Login');

// --------------------------------------------------------
router.route('/register')
  .get((req, res) => {
    res.send(
      res.renderComponent(Register, {
        title: 'Register',
      }),
    );
  });

// --------------------------------------------------------
router.route('/login')
  .get((req, res) => {
    res.send(
      res.renderComponent(Login, {
        title: 'Login',
      }),
    );
  });

module.exports = router;
