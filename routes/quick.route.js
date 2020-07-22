const router = require("express").Router(); //post / get 
const Quick = require("../models/quick.model");
// const moment = require("moment");
const cloudinary = require("cloudinary");
const multer = require("multer");
const upload = multer({ dest: "./uploads/" });
const isLoggedIn = require("../config/loginBlocker");

router.get("/create", (req, res) => {
    res.render("quick/create");
});

router.post("/create", upload.single("image"), isLoggedIn, (req, res) => {
    console.log(req.user);
    req.body.createdBy = req.user._id;
    
    // console.log(req.upload);
    cloudinary.uploader.upload(req.file.path, function (result) {
        console.log(result);
        req.body.image = result.url;

        let quick = new Quick(req.body);
        quick.save().then(() => {
            req.flash("success", "Quick & Simple created");
            res.redirect("/dashboard"); //should redirect to "list of Quick" recipes
        }).catch((err) => {
            console.log(err);
        });
    });

    //add other categories
});

module.exports = router;