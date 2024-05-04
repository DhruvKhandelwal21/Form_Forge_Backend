import express from "express";
import cors from "cors";
import mongoConnect from "./src/db";
import * as dotenv from "dotenv";
import routes from "./src/routes";
dotenv.config();
// const { MongoClient, ServerApiVersion } = require("mongodb");

// import routes from './src/Routes/routes';
const app = express();

app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send({ message: "Hello World!" });
});
app.use(routes);
const database = async () => {
  const client = await mongoConnect();
  app.locals.db = client.db();
};
database().then(() => {
  // tslint:disable-next-line:no-console
  console.log("Database connected");
});

const server = app.listen(process.env.PORT, () => {
  console.log(`server started on port ${process.env.PORT}`);
});

// server();