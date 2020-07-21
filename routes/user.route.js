//user makes a post
//user goes to dashboard
const router = require("express").Router();
const isLoggedIn = require("../config/loginBlocker");
const User = require("../models/user.model");
const Quick = require("../models/quick.model");
const { request } = require("express");
const moment = require("moment");

router.post("/create", (req, res) => {
    let finalData = {
        category: req.body.category,
        createdBy: req.user._id,
        datePublished: moment(),
    };

    let quick = new quick(finalData);
    quick.save().then(() => {
        User.findByIdAndUpdate(req.user._id, {
            $push: { quick: quick._id }
        }).then(() => {
            req.flash("success", "Quick & Simple created");
            res.redirect("/dashboard");
        }).catch((err) => {
            console.log(err);
        });
    });

    //add other categories
});

router.get("/create", isLoggedIn, (req, res) => {
    res.render("user/create");
});

// router.get("/create", async (req, res) => {
//     try{
//         let users = await User.find();

//         res.render("users/create", { users });
//     } catch(error) {
//         console.log(users);
//     }
// });

//CREATE: DISPLAY FORM FOR NEW USER
// router.get("/new", (req, res) => {
//     res.render("users/new");
// });

// router.post("/new", (req, res) => {
//     let user = new User(req.body);

//     user.save()
//     .then(() => {
//         res.redirect("/");
//     })
//     .catch((err) => {
//         console.log(err);
//     });
// });

// router.get("/:id", (req, res) => {
//     User.findById(req.params.id)
//       .then((user) => {
//         res.send(user);
//       });
//   });


module.exports = router;
