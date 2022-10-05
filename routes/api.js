const Thought = require('../models/Thought');
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

router.get('/users/:id', (req, res) => {

    User.findOne({ _id: req.params.id })
        .populate("thoughts")
        .populate("friends")
        .then((users) => {

            res.json(users);

        });
});

router.post('/users', (req, res) => {
    User.create(req.body)
    .then((course) => res.json(course))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
})

router.put('/users/:id', (req, res) => {

    User.findOneAndUpdate({ _id: req.params.id }, { $set: req.body },
        { runValidators: true, new: true })
        .then((users) => {

            res.json(users);

        });
});

router.delete('/users/:id', (req, res) => {

    User.findOneAndDelete({ _id: req.params.id })
   
    .then(() => res.json({ message: 'Course and students deleted!' }))
    .catch((err) => res.status(500).json(err));
})

router.get('/thoughts', (req, res) => {

    Thought.find({})

        .then((thoughts) => {

            res.json(thoughts);

        });
});

router.get('/thoughts/:id', (req, res) => {

    Thought.findOne({ _id: req.params.id })
       
        .then((thoughts) => {

            res.json(thoughts);

        });
});

router.post('/thoughts', (req, res) => {
    Thought.create(req.body)
    .then(async (thought) => {
        await User.findOneAndUpdate(
            { _id: req.body.userId },
            { $push: { thoughts: thought._id } },
            { new: true }
          );
          
        res.json(thought)
    })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
})


router.put('/thoughts/:id', (req, res) => {

    Thought.findOneAndUpdate({ _id: req.params.id }, { $set: req.body },
        { runValidators: true, new: true })
        .then((thoughts) => {

            res.json(thoughts);

        });
});

router.delete('/thoughts/:id', (req, res) => {

    Thought.findOneAndDelete({ _id: req.params.id })
   
    .then(() => res.json({ message: 'Thought deleted!' }))
    .catch((err) => res.status(500).json(err));
})

router.put('/thoughts/:id/reactions', (req, res) => {

    Thought.findOneAndUpdate({ _id: req.params.id }, { $set: req.body },
        { runValidators: true, new: true })
        .then((thoughts) => {

            res.json(thoughts);

        });
});


module.exports = router;