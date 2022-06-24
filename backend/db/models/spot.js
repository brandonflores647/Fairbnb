'use strict';
module.exports = (sequelize, DataTypes) => {
  const Spot = sequelize.define('Spot', {
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Users'
      },
    },
    address: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING(64)
    },
    city: {
      allowNull: false,
      type: DataTypes.STRING(64)
    },
    state: {
      allowNull: false,
      type: DataTypes.STRING(20)
    },
    country: {
      allowNull: false,
      type: DataTypes.STRING(64)
    },
    name: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING(64)
    },
    price: {
      allowNull: false,
      type: DataTypes.DECIMAL
    },
  }, {});
  Spot.associate = function(models) {
    Spot.belongsTo(models.User, {
      foreignKey: 'userId'
    });
    Spot.hasMany(models.Review, {
      foreignKey: 'spotId'
    });
    Spot.hasMany(models.Image, {
      foreignKey: 'spotId'
    });
  };
  return Spot;
};
