const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Rating extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Route }) {
      this.belongsTo(User, { foreignKey: 'user_id' });
      this.belongsTo(Route, { foreignKey: 'route_id' });
      // define association here
    }
  }
  Rating.init(
    {
      user_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'User',
          key: 'id',
        },
      },
      route_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'Routes',
          key: 'id',
        },
      },
      point: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      comment: {
        allowNull: true,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'Rating',
      tableName: 'Ratings',
    },
  );
  return Rating;
};
