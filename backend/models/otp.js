module.exports = (sequelize, Sequelize) => {
    const Otp = sequelize.define("otp", {
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
  
    return Otp;
  };