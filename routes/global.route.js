const router = require("express").Router(); //post / get
const Global = require("../models/global.model");
const cloudinary = require("cloudinary");
const multer = require("multer");
const upload = multer({ dest: "./uploads/" });
const isLoggedIn = require("../config/loginBlocker");

//CREATE FORM
router.get("/create", (req, res) => {
  res.render("global/create");
});

router.post("/create", upload.single("image"), isLoggedIn, (req, res) => {
  console.log(req.user);
  req.body.createdBy = req.user._id;

  // console.log(req.upload);
  cloudinary.uploader.upload(req.file.path, function (result) {
    console.log(result);
    req.body.image = result.url;

    let global = new Global(req.body);
    global
      .save()
      .then(() => {
        req.flash("success", "Global recipe created");
        res.redirect("/global/index"); //after creating redirect to "list of Global" recipes
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

//VIEW CREATED FORMS
router.get("/index", (req, res) => {
  Global.find()
    .populate("createdBy")
    .then((globals) => {
      // console.log("createdBy", globals[0].createdBy);
      res.render("global/index", { globals }); //connect to .ejs
    })
    .catch((err) => {
      console.log(err);
    });
});

///SHOW INDIVIDUAL FORM
router.get("/show/:id", (req, res) => {//show recipe's id
  // res.send("show page");
  Global.findById(req.params.id)
    .populate("createdBy")
    .then((global) => {
      res.render("global/show", { global });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
