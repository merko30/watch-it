const mongoose = require("mongoose");

module.exports = () => {
  return mongoose
    .connect(process.env.DB, {
      useNewUrlParser: true,
      // useUnifiedTopology: true,
      useFindAndModify: false,
      // useFindAndModify: false,
      useCreateIndex: true,
    })
    .then(() => {
      console.log("Connected to database");
    })
    .catch((error) => console.log(error));
};
