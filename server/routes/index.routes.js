const router = require('express').Router();

// const mainRouter = require('./main.routes'); // TODO

// const authViewRouter = require('./views/authView.routes'); // TODO
const authApiRouter = require('./api/authApi.routes');
const prefApiRouter = require('./api/pref.routes');

// router.use('/', mainRouter); // TODO
// router.use('/auth', authViewRouter); // TODO
router.use('/api/auth', authApiRouter);
router.use('/pref', prefApiRouter);

module.exports = router;
