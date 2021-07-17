module.exports = (sequelize, Sequelize) => {
    const Meeting = sequelize.define("meeting", {
      user_id: {
        type: Sequelize.INTEGER
      },
      isSchedule: {
        type: Sequelize.BOOLEAN
      },
      room_name: {
        type: Sequelize.STRING
      },
      hash_name: {
        type: Sequelize.STRING
      },
      scheduleDate: {
          type: Sequelize.DATE
      },
      isUsed: {
          type: Sequelize.BOOLEAN
      },
      passCode: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.BOOLEAN
    },
  });
  
    return Meeting;
  };