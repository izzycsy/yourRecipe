const express = require("express");
const server = express();
const expressEjsLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
require("dotenv").config();
const session = require("express-session"); //must come bef MongoStore
const MongoStore = require("connect-mongo")(session);

const flash = require("connect-flash");
const passport = require("./config/passportConfig");
// const isLoggedIn = require("./config/loginBlocker");
const cloudinary = require("cloudinary");
const authRoutes = require("./routes/auth.route"); //auth.route
const userRoutes = require("./routes/user.route"); 
const categoryRoutes = require("./routes/category.route"); //category.route
const quickRoutes = require("./routes/quick.route"); //quick.route
const globalRoutes = require("./routes/global.route") //global.route


mongoose.Promise = Promise; //to catch any error, ie. load too long

//mongodb connection code
//connect to MongoDB Cloud 
mongoose
  .connect(process.env.MONGODBLIVE, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    .then(() => {
      console.log("Mongodb connected!");
    })
    .catch((err) => {
      console.log(err);
    });

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
      cookie: { maxAge: 36000000 }, //milliseconds
      store: new MongoStore({ url: process.env.MONGODBLIVE }),
    })
  );

//CLOUDINARY
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

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
server.use("/global", globalRoutes);

// server.get("*", (req, res) => {
//     res.send("does not exisit");
// });


server.listen(process.env.PORT, () => {
    console.log(`connected to express on ${process.env.PORT}`)
});