'use strict';
module.exports = (sequelize, DataTypes) => {
  const user_fb = sequelize.define('user_fb', {
    fb_id: DataTypes.STRING,
    name: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    underscored: true,
  });
  user_fb.associate = function(models) {
    // associations can be defined here
  };
  return user_fb;
};