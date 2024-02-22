const authApiRouter = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../../db/models/index');

authApiRouter.route('/login').post(async (req, res) => {
  const { name, password } = req.body;
  console.log(name, password);
  try {
    if (password === '' || name === '') {
      return res.status(400).json({ text: '!empty' });
    }
    const user = await User.findOne({ where: { name } });
    if (user) {
      const isSame = await bcrypt.compare(password, user.password);
      if (isSame) {
        console.log(user);
        req.session.userId = user.id;
        return res.status(200).json({ text: 'OK', user: user.name });
      }
      return res.status(401).json({ text: 'Wrong login!' });
    }
    return res.status(401).json({ text: 'User not found!' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

authApiRouter.route('/register').post(async (req, res) => {
  const { name, email, password } = req.body;
  console.log(name, email, password);
  try {
    if (name === '' || email === '' || password === '') {
      return res.status(400).json({ text: '!empty' });
    }
    const userDB = await User.findOne({ where: { name } });
    const emailDB = await User.findOne({ where: { email } });
    console.log(userDB, emailDB);
    if (userDB) {
      return res.status(400).json({ text: '!userName' });
    }
    if (emailDB) {
      return res.status(400).json({ text: '!email' });
    }
    const hash = await bcrypt.hash(req.body.password, 10);
    const newUser = await User.create({ ...req.body, password: hash });
    if (newUser.id) {
      console.log(newUser);
      req.session.userId = newUser.id;
      return res.status(201).json({ text: 'OK', user: newUser.name });
    }
    return res.status(500).json({ error: 'Ошибка создания сессии' });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

authApiRouter.route('/logout').get((req, res) => {
  req.session.destroy((error) => {
    if (error) {
      return res.status(500).json({ error: 'Logout failed' });
    }

    return res.clearCookie('leopards_cookies').redirect('/');
  });
});

module.exports = authApiRouter;
