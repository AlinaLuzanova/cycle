const saveRouter = require('express').Router();
const { UserRoute } = require('../../db/models');

saveRouter.route('/:id')
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
    const routeId = req.params.id; const { user } = res.locals;
    if (user) {
      try {
        await UserRoute.destroy({ where: { user_id: user.id, route_id: routeId } });
        res.status(200).json({ message: 'RouteInterface removed!' });
      } catch (e) {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  });
module.exports = saveRouter;
