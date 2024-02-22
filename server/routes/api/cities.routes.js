const citiesRouter = require('express').Router();
const { Route } = require('../../db/models');

citiesRouter.get('/', async (req, res) => {
    try {
        const allRoutes = await Route.findAll({ raw: true });
        res.status(200).json(allRoutes);
    } catch (error) {
        console.error('Error fetching cities data: ', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = citiesRouter;
