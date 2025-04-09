import express from "express";
import ip from 'ip'
import cors from "cors";

import routes from "./routes/index";

const app = express();


app.use("/uploads", express.static("uploads"));
app.use(cors());
  // app.use(
  //   morgan(":method :url :status :res[content-length] - :response-time ms")
  // );

console.log(ip.address());

app.use("/api", routes);

const port =  process.env.PORT || 4000;

app.listen(port, () =>  console.log(`App running on port ${port}.`));
