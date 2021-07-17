const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const router = require('./router/router')
const db = require("./models/index");
const middleware = require('./midleware/index')

const app = express();
// jika production
db.sequelize.sync();

// jika development 
// db.sequelize.sync({
//     force: true
// });
var corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));
app.use(middleware)

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
// app.get("/", (req, res) => {
//   res.json({ message: "Welcome to bezkoder application." });
// });
router(app)


// set port, listen for requests
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});