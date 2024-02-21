const { Rating } = require('../../db/models');

async function calcRating(user, route, point, comment) {
  try {
    await Rating.create({
      user_id: user.id, route_id: route.id, point, comment,
    });
    const allRatings = await Rating.findAll({ where: { user_id: user.id, route_id: route.id }, raw: true });
    const sumOfRatings = allRatings.reduce((sum, item) => sum + Number(item.point), 0);
    const averageRating = sumOfRatings / allRatings.length;
    route.update({ rating: averageRating });
  } catch (e) {
    console.log(e.message);
  }
}

module.exports = calcRating;
