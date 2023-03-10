import Database from "./Databse"
import APIRouter from "./routes/api"
import bodyParser from "body-parser"


const express = require('express')
const app = express()
const port = 3000

//Make sure I'm connected to the database and all that
const start = async ():Promise<void> => {
  await Database.connect();
  app.use(express.json());
  app.use(bodyParser.json())
  app.use("/api", APIRouter);
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  })
}

start();