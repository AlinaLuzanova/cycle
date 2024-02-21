const router = require('express').Router();

// const mainRouter = require('./main.routes'); // TODO

const authViewRouter = require('./views/authView.routes'); // TODO
const authApiRouter = require('./api/authApi.routes');

// router.use('/', mainRouter); // TODO
router.use('/auth', authViewRouter); // TODO
router.use('/api/auth', authApiRouter);

module.exports = router;
