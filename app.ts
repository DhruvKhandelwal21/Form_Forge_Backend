import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"
import mongoConnect from "./src/db";
import * as dotenv from "dotenv";
import routes from "./src/routes";
import errorHandler from "./src/middleWare/errorHandler";
dotenv.config();

const app = express();
app.use(express.json({limit: "20kb"}));
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}));
app.use(express.urlencoded({extended: true}));
app.use(cookieParser())
app.get("/", (req, res) => {
  res.send({ message: "Hello World!" });
});
app.use(routes);
app.use(errorHandler.errorHandler)
const database = async () => {
  const client = await mongoConnect();
  app.locals.db = client.db();
  app.locals.client = client;
};
database().then(() => {
  // tslint:disable-next-line:no-console
  console.log("Database connected");
});

const server = app.listen(process.env.PORT, () => {
  console.log(`server started on port ${process.env.PORT}`);
});

// server();