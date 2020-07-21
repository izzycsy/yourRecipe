//user click on CREATE
const router = require("express").Router();

router.get("/create", (req, res) => {
    res.render("category/create");
});


module.exports = router;