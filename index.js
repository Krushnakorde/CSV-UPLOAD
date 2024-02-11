/** ------------------ IMPORTING PACKAGE ------------------ **/
import express from "express";
const server = express();
import path from "path";
import layouts from "express-ejs-layouts"
import csv from "csv-parser"

import bodyParser from "body-parser"
import router from "./src/features/routes/routes.js"
import ApplicationError from "./src/features/middleware/ApplicationError.js";

// setting layouts
server.use(layouts);

// middleware for body-parser
server.use(bodyParser.json());
server.use(express.urlencoded({extended: true}));

//accesing static files from assets folder
server.use(express.static('./public'));    

//setting  view engine
server.set("view engine", "ejs");
server.set("views", path.join(path.resolve(), 'src', 'features', 'views') );

// setting  routes
server.use('/', router);

//Error Handler

server.use((err, req, res, next)=>{
    console.log(err)
    if(ApplicationError){
       return  res.status(err.code).send(err.message);
    }

    res.status(500).send("Internal server Error");


})


export default server;



