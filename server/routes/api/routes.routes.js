const routesRouter = require('express').Router();
const { Route } = require('../../db/models');

routesRouter.route('/')
    .get(async (req, res) => {
        try {
            const routes = await Route.findAll({ raw: true });
            res.status(200).json(routes);
        } catch (error) {
            console.error('Error fetching routes:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });

module.exports = routesRouter;
