const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.js")(sequelize, Sequelize);
db.otp = require("./otp.js")(sequelize, Sequelize);
db.activate = require("./activate.js")(sequelize, Sequelize);
db.meeting = require('./meeting')(sequelize, Sequelize)
db.invited = require('./invited')(sequelize, Sequelize)


// db.user.hasMany(db.activate, {foreignKey: 'user_id'})
db.activate.belongsTo(db.user, {foreignKey: 'user_id'})
db.otp.belongsTo(db.user, {foreignKey: 'user_id'})


module.exports = db;