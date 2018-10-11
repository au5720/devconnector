const express = require("express");
const router = express.Router();
const gravatar = express("gravatar");
const bcrypt = require("bcryptjs");

// Load user model
const User = require("../../models/User");

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Users Works" }));

// @route   GET api/users/register
// @desc    Register user
// @access  Public
router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        return res.status(400).json({ email: "Email already exists" });
      } else {
        // const avatar = gravatar.url(req.body.email, {
        //   s: "200",
        //   r: "pg",
        //   d: "mm"
        // });

        const newuser = new User({
          name: req.body.name,
          email: req.body.email,
          avatar:
            "//www.gravatar.com/avatar/64d7eeecc15299f27b04a067d21159a2?s=200&r=pg&d=mm",
          password: req.body.password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newuser.password, salt, (err, hash) => {
            if (err) throw err;
            newuser.password = hash;
            newuser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });
      }
    })
    .catch(err => console.log(err));
});

module.exports = router;
