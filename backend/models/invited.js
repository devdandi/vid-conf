module.exports = (sequelize, Sequelize) => {
    const Invited = sequelize.define("invited", {
      meeting_id: {
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING
      },
  });
  
    return Invited;
  };