const express = require("express");
const server = express();
const expressEjsLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
require("dotenv").config();
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("./config/passportConfig");
// const isLoggedIn = require("./config/loginBlocker");
const authRoutes = require("./routes/auth.route"); //auth.route
const userRoutes = require("./routes/user.route"); 
const categoryRoutes = require("./routes/category.route"); //category.route
const quickRoutes = require("./routes/quick.route"); //quick.route

mongoose.Promise = Promise; //to catch any error, ie load too long

//mongodb connection code
//connect to MongoDB Cloud 
mongoose.connect(
    process.env.MONGODBLIVE,
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
server.use(express.static("public")); //public folder
server.use(express.urlencoded({ extended: true })); //retrieve data from form
server.set("view engine", "ejs");
server.use(expressEjsLayouts);

//SECRET
server.use(
    session({
      secret: process.env.SECRET,
      saveUninitialized: true,
      resave: false,
      cookie: { maxAge: null }
    })
  );

//PASSPORT 
server.use(passport.initialize());
server.use(passport.session());
server.use(flash());

server.use(function(req, res, next) {
    // before every route, attach the flash messages and current user to res.locals
    res.locals.alerts = req.flash();
    res.locals.currentUser = req.user;
    next();
  });

server.get("/", (req, res) => {
    res.redirect("/dashboard");
});

//GLOBAL VARIABLE

//ROUTE
server.use(authRoutes); //no need to specify bec I want the route directory itself
server.use("/users", userRoutes);
server.use("/category", categoryRoutes);
server.use("/quick", quickRoutes);

// server.get("*", (req, res) => {
//     res.send("does not exisit");
// });

server.listen(process.env.PORT, () => {
    console.log(`connected to express on ${process.env.PORT}`)
});