const router = require('express').Router();

// const mainRouter = require('./main.routes'); // TODO

// const authViewRouter = require('./views/authView.routes'); // TODO
const authApiRouter = require('./api/authApi.routes');
const routesApi = require('./api/routes.routes');
const prefApiRouter = require('./api/pref.routes');
const citiesRouter = require('./api/cities.routes');
const startFinishRouter = require('./api/startsAndFinishes');
const searchRouter = require('./api/search.routes');
// router.use('/', mainRouter); // TODO
// router.use('/auth', authViewRouter); // TODO
router.use('/', authApiRouter);
router.use('/routes', routesApi);
router.use('/pref', prefApiRouter);
router.use('/cities', citiesRouter);
router.use('/startsAndFinishes', startFinishRouter);
router.use('/search', searchRouter);
module.exports = router;
