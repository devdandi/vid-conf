module.exports = (sequelize, Sequelize) => {
    const Activate = sequelize.define("activate", {
      user_id: {
        type: Sequelize.INTEGER
      },
      expires: {
        type: Sequelize.STRING
      },
      code: {
        type: Sequelize.STRING
      }
    });
  
    return Activate;
  };