const routesRouter = require('express').Router();
const { Route } = require('../../db/models');

routesRouter
  .route('/')
  .get(async (req, res) => {
    try {
      const routes = await Route.findAll({ raw: true });
      res.status(200).json(routes);
    } catch (error) {
      console.error('Error fetching routes:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  })
  .post(async (req, res) => {
    const {
      title, city, description, start, finish, longway,
    } = req.body;
    try {
      if (title && description && start && finish && longway) {
        const routeData = await Route.create({
          title,
          city,
          description,
          start,
          finish,
          longway,
          user_id: null,
          rating: 0,
        });
        if (routeData.id) {
          return res.json(routeData);
        }
        return res.status(500).end('post create error');
      }
    } catch (error) {
      res.status(500).end({ error });
    }
  });

module.exports = routesRouter;
