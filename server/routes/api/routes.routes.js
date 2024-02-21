const routesRouter = require('express').Router();
const { Route, UserRoute } = require('../../db/models');

routesRouter
  .route('/')
  .get(async (req, res) => {
    try {
      const routes = await Route.findAll({ raw: true });
      return res.status(200).json(routes);
    } catch (error) {
      console.error('Error fetching routes:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  })
  .post(async (req, res) => {
    const { title, city, description, start, finish, longway } = req.body;
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
      return res.status(500).end({ error });
    }
  });

routesRouter
  .route('/:id')
  .post(async (req, res) => {
    const routeId = req.body.route;
    const { user } = res.locals;
    if (user) {
      try {
        await UserRoute.create({ user_id: user.id, route_id: routeId });
        res.status(200).json({ message: 'RouteInterface saved!' });
      } catch (e) {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  })
  .delete(async (req, res) => {
    const routeId = req.params.id;
    const { user } = res.locals;
    if (user) {
      try {
        await UserRoute.destroy({
          where: { user_id: user.id, route_id: routeId },
        });
        res.status(200).json({ message: 'RouteInterface removed!' });
      } catch (e) {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  })
  .get(async (req, res) => {
    try {
      const { id: routeId } = req.params;
      if (Number.isNaN(+routeId)) {
        return res.status(400).json({ error: 'Bad request' });
      }
      const route = await Route.findByPk(routeId, { raw: true });
      if (!route) {
        return res.status(404).json({ error: 'Route not found' });
      }
      return res.status(200).json(route);
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  });

module.exports = routesRouter;
