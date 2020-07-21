const router = require("express").Router(); //post / get 
const Quick = require("../models/quick.model");

router.get("/create", (req, res) => {
    res.render("quick/create");
});

router.post("/create", (req, res) => {
    let finalData = {
        category: request.body.category,
        createdBy: request.user._id,
        datePublished: moment().add(7, "days")
    };

    let quick = new quick(finalData);
    quick.save().then(() => {
        User.findByIdAndUpdate(request.user._id, {
            $push: { quick: quick._id }
        }).then(() => {
            req.flash("success", "Quick & Simple created");
            res.redirect("/dashboard"); //should redirect to "list of Quick" recipes
        }).catch((err) => {
            console.log(err);
        });
    });

    //add other categories
});

module.exports = router;