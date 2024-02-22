const searchRouter = require('express').Router();
const {Route} = require('../../db/models');

searchRouter.post('/', async (req, res) => {
    const { city, start, finish, distance } = req.body;
    try{
        if(city && !start && !finish && !distance){
            const cities = await Route.findAll({where:{city:city},raw:true})
            console.log(cities)
            res.status(200).json(cities)
        }
        if(city && start && finish && distance){
            const cities = await Route.findAll({ where: { city: city, start: start,finish: finish,longway: Number(distance)},raw:true})
        res.status(200).json(cities)
        }
        if(city && start && finish && !distance){
            const cities = await Route.findAll({ where: { city: city, start: start,finish: finish},raw:true})
            res.status(200).json(cities)
        }
        if(city && start && !finish && !distance){
            const cities = await Route.findAll({ where: { city: city, start: start},raw:true}) ;
            res.status(200).json(cities)
        }
        if(city && finish && !distance && !start){
            const cities = await Route.findAll({ where: { city: city, finish: finish},raw:true}) ;
            res.status(200).json(cities)
        }
        if(city && distance && !start && !finish){
            const cities = await Route.findAll({ where: { city: city, longway: Number(distance)},raw:true}) ;
            res.status(200).json(cities)
        }
        if(distance && !city && !start && !finish){
            const cities = await Route.findAll({ where: { longway: Number(distance)},raw:true}) ;
            res.status(200).json(cities)
        }

    }catch (e) {
res.status(500).send(e)
    }
})

module.exports = searchRouter
