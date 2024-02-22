const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Route extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, UserRoute, Rating }) {
      // define association here
      this.belongsTo(User, { foreignKey: 'user_id' });
      this.hasMany(UserRoute, { foreignKey: 'route_id' });
      this.hasMany(Rating, { foreignKey: 'route_id' });
    }
  }
  Route.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      start: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      finish: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      longway: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      user_id: {
        allowNull: true,
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      rating: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      first_point: {
        type: DataTypes.STRING,
      },
      second_point: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'Route',
      tableName: 'Routes',
    }
  );
  return Route;
};
