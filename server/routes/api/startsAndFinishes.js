const startFinishRouter = require('express').Router();
const { Route } = require('../../db/models');

startFinishRouter.get('/', async (req, res) => {
    try {
        const city = req.query.city;
        const startsAndFinishes = await Route.findAll({
            where: { city: city },
            attributes: ['start', 'finish'],
            raw: true
        });
        console.log('startFinish -------=-------', startsAndFinishes);
        res.status(200).json(startsAndFinishes);
    } catch (error) {
        console.error('Error fetching starts and finishes: ', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = startFinishRouter;
