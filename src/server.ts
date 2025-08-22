import express from "express";
import { Application } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes.js";


const server: Application = express();
server.use(cors());
server.use(express.json());
server.use(
    express.urlencoded({
        extended: true,
  })
);
server.use("/",routes);

dotenv.config();

const PORT = process.env.PORT;

server.listen(PORT, async () => {
    console.log(`Server Fire on http:localhost//${PORT}`);
    try {
        await mongoose.connect(
            process.env.DATABASE_URL as string
        );
        console.log("Connected To Database");
    } 
    catch (error) {
        console.log("Error connecting to Database");
    }
});