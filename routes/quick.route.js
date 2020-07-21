const router = require("express").Router(); //post / get 
const Quick = require("../models/quick.model");
const moment = require("moment");
// const { request } = require("express");

router.get("/create", (req, res) => {
    res.render("quick/create");
});

router.post("/create", (req, res) => {
    // let finalData = {
    //     category: req.body.category,
    //     createdBy: req.user._id,
    //     datePublished: moment().add(7, "days"),
    // };

    console.log(req.user);
    req.body.createdBy = req.user._id;
    
    // req.body.datePublished = moment();

    let quick = new Quick(req.body);
    quick.save().then(() => {
        // User.findByIdAndUpdate(req.user._id, {
        //    $push: { quick: quick._id }
        // })

            req.flash("success", "Quick & Simple created");
            res.redirect("/dashboard"); //should redirect to "list of Quick" recipes
        }).catch((err) => {
            console.log(err);
        });
    //add other categories
});

module.exports = router;