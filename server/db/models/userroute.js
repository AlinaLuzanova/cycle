const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserRoute extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Route }) {
      // define association here
      this.belongsTo(User, { foreignKey: 'user_id' });
      this.belongsTo(Route, { foreignKey: 'route_id' });
    }
  }
  UserRoute.init(
    {
      user_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
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

    },
    {
      sequelize,
      modelName: 'UserRoute',
      tableName: 'UserRoutes',
    },
  );
  return UserRoute;
};
