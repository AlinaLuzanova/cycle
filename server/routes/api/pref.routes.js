const prefRouter = require('express').Router();
const { UserRoute, Route } = require('../../db/models');

prefRouter.route('/')
  .get(async (req, res) => {
    // const { id } = req.params;

    // -------------------------------------------
    // !!! Mock-data
    res.locals.user = { id: 1 };
    // -------------------------------------------

    const { user } = res.locals;

    if (user) {
      try {
        const result = await UserRoute.findAll(
          {
            raw: true,
            where: {
              user_id: user.id,
            },
            include: [{
              model: Route,
            }],
          },
        );

        console.log(result);
        res.status(200).json({ message: "Find user's preferred routes", result });
      } catch (e) {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  });

module.exports = prefRouter;
