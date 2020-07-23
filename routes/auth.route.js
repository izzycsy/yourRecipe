const router = require("express").Router();
const passport = require("../config/passportConfig");
const isLoggedIn = require("../config/loginBlocker");
const User = require("../models/user.model");


//ROUTE: SignUp
router.get("/auth/signup", (req, res) => {
    res.render("auth/signup");
});

router.post("/auth/signup", (req, res) => {
    let user = new User(req.body);

    console.log(user);
    user.save()
    .then(() => {
        passport.authenticate("local", {
            successRedirect: "/dashboard", //after login success
            successFlash: "You have logged In!",
          })(req, res);
    })
    .catch((err) => { 
        console.log(err);
    });
});

//ROUTE: SignIn
router.get("/auth/signin", (req, res) => {
    res.render("auth/signin");
});

router.get("/dashboard", isLoggedIn, (req, res) => {
    res.render("dashboard/index");
});

router.post("/auth/signin", passport.authenticate("local", {
    successRedirect: "/dashboard", //after login success
    failureRedirect: "/auth/signin", //if fail
    failureFlash: "Invalid Username or Password",
    successFlash: "You have signed in!"
}));

//ROUTE: signOut
router.get("/auth/signout", (req, res) => {
    req.logout(); //clear and break session
    req.flash("success", "You have signed out!");
    res.redirect("/auth/signin");
  });

module.exports = router;