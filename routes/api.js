const User = require('../models/User');

const router = require('express').Router();


router.get('/users', (req, res) => {

    User.find({})
        .populate("thoughts")
        .populate("friends")
        .then((users) => {

            res.json(users);

        });
});

module.exports = router;