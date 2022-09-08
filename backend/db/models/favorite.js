'use strict';
module.exports = (sequelize, DataTypes) => {
  const Favorite = sequelize.define('Favorite', {
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Users'
      },
    },
    spotId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Spots'
      },
    },
  }, {});
  Favorite.associate = function(models) {
    Favorite.belongsTo(models.User, {
      foreignKey: 'userId'
    });
    Favorite.belongsTo(models.Spot, {
      foreignKey: 'spotId'
    });
  };
  return Favorite;
};
