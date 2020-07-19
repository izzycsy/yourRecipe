const router = require("express").Router();
const User = require("../models/user.model");
const passport = require("../config/passportConfig");
const isLoggedIn = require("../config/loginBlocker");


//ROUTE: SignUp
router.get("/auth/signup", (req, res) => {
    res.render("auth/signup");
});

router.post("auth/signup", (req, res) => {
    let user = new User(req.body);

    console.log(user);
    user.save()
    .then(() => {
        res.redirect("/auth");
        passport.authenticate("local", {
            successRedirect: "/dashboard", //after login success
            successFlash: "You have logged In!"
          })(request, response);
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

router.post("auth/signin", passport.authenticate("local", {
    successRedirect: "/dashboard", //after login success
    failureRedirect: "/auth/signin", //if fail
    failureFlash: "Invalid Username or Password",
    successFlash: "You have logged In!"
}));

//ROUTE: Logout
router.get("/auth/logout", (request, response) => {
    request.logout(); //clear and break session
    request.flash("success", "Dont leave please come back!");
    response.redirect("/auth/signin");
  });

module.exports = router;