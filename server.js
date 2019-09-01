const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ silent: true });

const routes = require("./routes");
const connectDatabase = require("./config/database");
const setMiddlewares = require("./config/middlewares");

const app = express();

connectDatabase();
setMiddlewares(app);

var ip = require("ip");
console.log(ip.address());

app.use("/api", routes);

app.use((err, req, res, next) => {
  const message = err.message || "Something went wrong";
  res.status(err.status || 500).json({ message });
});

var port = 5000 || process.env.PORT;

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
