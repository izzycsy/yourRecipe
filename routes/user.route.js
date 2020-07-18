const router = require("express").Router();
const User = require("../models/user.model");

router.get("/new", async (req, res) => {
    try{
        let users = await User.find();

        res.render("users/index", { users });
    } catch(error) {
        console.log(users);
    }
});

//CREATE: DISPLAY FORM FOR NEW USER
router.get("/new", (req, res) => {
    res.render("users/new");
});

router.post("/new", (req, res) => {
    let user = new User(req.body);

    user.save()
    .then(() => {
        res.redirect("/");
    })
    .catch((err) => {
        console.log(err);
    });
});

// router.get("/:id", (req, res) => {
//     User.findById(req.params.id)
//       .then((user) => {
//         res.send(user);
//       });
//   });


module.exports = router;
