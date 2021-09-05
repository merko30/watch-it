const mongoose = require("mongoose");

module.exports = () => {
  return mongoose
    .connect(process.env.DB)
    .then(() => {
      console.log("Connected to database");
    })
    .catch((error) => console.log(error));
};
