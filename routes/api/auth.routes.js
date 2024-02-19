const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../../db/models');

// --------------------------------------------------------
router.route('/register').post(async (req, res) => {
  const hash = await bcrypt.hash(req.body.password, 10);
  const { name, email, role } = req.body;

  let isseller;
  if (role === 'buyer') {
    isseller = false;
  } else {
    isseller = true;
  }

  const result = await User.findOne({
    raw: true,
    where: {
      email,
    },
  });

  if (result) {
    return res.status(400).json({ error: `User with email: ${email} alredy exist!` });
  }

  try {
    const newUser = await User.create({
      name,
      email,
      password: hash,
      isseller,
    });
    if (newUser.id) {
      req.session.userId = newUser.id;
      // req.session.user = { userId: newUser.id, email: newUser.email };
      return res.json({ text: 'OK' });
    }
    return res.status(500).json({ error: 'User cannot be created' });
  } catch (error) {
    console.log('api/auth.routes.js / .post (error):', error);
    return res.status(400).json({ error: error.message });
  }
});

// --------------------------------------------------------
router.route('/login').post(async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await User.findOne({
      where: { email },
    });

    // if (oldUser.id) {
    if (oldUser) {
      const isSame = await bcrypt.compare(password, oldUser.password);
      if (isSame) {
        req.session.userId = oldUser.id;
        return res.status(200).json({ text: 'OK' });
      }
      return res.status(401).json({ error: 'Login Data is incorrect' });
    }
    return res.status(401).json({ error: 'Login Data is incorrect' });
  } catch (error) {
    console.log('api/auth.routes.js / .post (error):', error);
    return res.status(500).json({ error: error.message });
  }
});

router.route('/logout').get((req, res) => {
  req.session.destroy((error) => {
    if (error) {
      return res.status(500).json({ error: 'Log out Failed' });
    }
    return res.clearCookie('leopards_cookies').redirect('/');
  });
});

module.exports = router;
