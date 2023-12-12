import express, { Application } from "express";
import { mainApp } from "./mainApp";
import { Database } from "./config/database";
import env from "dotenv"
env.config()

const port:number = parseInt(process.env.PORT!);

const app: Application = express();

mainApp(app)

const server = app.listen(process.env.PORT || port, () => {
console.log()
Database()
})

process.on("uncaughtException", (error:Error) => {
    console.log(`Error due to ${error.message}`)
})

process.on("unhandledRejection", (reason:any) => {
    console.log(`Error due to ${reason.message}`);
    
    server.close(() => {
        process.exit(1);
    })
});
