const express = require("express");
const server = express();
const expressEjsLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
require("dotenv").config();

//mongodb connection code
mongoose.connect(
    process.env.MONGODBURL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    },
    () => {
        console.log("Mongodb connected!");
    }
);

//MIDDLEWARE
server.use(express.urlencoded({ extended: true })); //retrieve data from form
server.set("view engine", "ejs");
server.use(expressEjsLayouts);

//SECRET

//PASSPORT 

//GLOBAL VARIABLE

//ROUTE
// server.use("/", require("./routes/user.route"));
server.use("/user", require("./routes/user.route"))


server.listen(process.env.PORT, () => {
    console.log(`connected to express on ${process.env.PORT}`)
});