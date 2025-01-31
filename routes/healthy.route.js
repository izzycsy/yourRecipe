const router = require("express").Router(); //post / get 
const Healthy = require("../models/healthy.model");
const cloudinary = require("cloudinary");
const multer = require("multer");
const upload = multer({ dest: "./uploads/" });
const isLoggedIn = require("../config/loginBlocker");

//CREATE FORM
router.get("/create", (req, res) => {
    res.render("healthy/create");
});

router.post("/create", upload.single("image"), isLoggedIn, (req, res) => {
    console.log(req.user);
    req.body.createdBy = req.user._id;
    
    // console.log(req.upload);
    cloudinary.uploader.upload(req.file.path, function (result) {
        console.log(result);
        req.body.image = result.url;

        let healthy = new Healthy(req.body);
        healthy.save().then(() => {
            req.flash("success", "Healthy recipe created");
            res.redirect("/healthy/index"); //after creating redirect to "list of Healthy" recipes
        }).catch((err) => {
            console.log(err);
        });
    });
});

//VIEW CREATED FORMS
router.get("/index", (req, res) => {
    Healthy.find()
    .populate("createdBy")
    .then((healthys) => {
        // console.log("createdBy", healthys[0].createdBy);
        res.render("healthy/index", { healthys });
    })
    .catch((err) => {
        console.log(err);
    })
});

//SHOW INDIVIDUAL FORM
router.get("/show/:id", (req, res) => { //show recipe's id
    // res.send("show page");
    Healthy.findById(req.params.id)
    .populate("createdBy")
    .then((healthy) => {
        res.render("healthy/show", { healthy })
    }).catch((err) => {
        console.log(err);
    })
})

module.exports = router;