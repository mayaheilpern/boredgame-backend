import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import bodyParser from "body-parser";

import router from "./routes/router.js" 
import { initMongoServer } from "./db/connection.js";

initMongoServer();
const app = express();
const PORT = process.env.PORT || 4000;
const db = mongoose.connection;

app.use(express.json());
app.use(cors());
app.use("/", router);
app.use(bodyParser.json()).use(bodyParser.urlencoded({ extended: false }));

db.on("error", error => console.log(error.message));
db.on("connected", () => console.log(`Mongo is connected`));
db.on("disconnected", () => console.log(`Mongo is disconnected`));

app.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}`);
});
