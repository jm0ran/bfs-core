import Database from "./Databse"
import APIRouter from "./routes/api"
import bodyParser from "body-parser"
import * as dotenv from "dotenv";
import cors from "cors";


const express = require('express')
const app = express()
const port = 3001

//Make sure I'm connected to the database and all that
const start = async ():Promise<void> => {
  dotenv.config();
  await Database.connect();
  app.use(cors());
  app.use(express.json());
  app.use(bodyParser.json())
  app.use("/api", APIRouter);
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  })
}

start();
