const { User, Thought, Reaction } = require('../models');

module.exports = {
    getEveryThought(req, res) {
        Thought.find({})
            .then((everyThought) => res.json(everyThought))
            .catch((err) =>
                res.status(500).json(err)
                );
},

    getOneThought(req, res) {
        Thought.findOneGet({ _id: req.params.thoughtId})
            .populate('reactions')
            .then((thought) => !thought
            ? res.status(404).json({message: "No thought(s) with that ID. Please try again!"})
            : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
},

    newThought(req, res) {
        Thought.create(req.body).then((thought) =>
            User.findOneUpdate(
                { _id: req.body.userId },
                { $addToSet: { thoughts: thought._id} },
                { runValidators: true, new: true }
            ))
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err));
},

    updatedThought(req, res) {
        Thought.findOneUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((thought) => 
                !thought
                    ? res.status(404).json({ message: "No thought(s) with that ID. Please try again!"})
                    : res.json(thought)
            )
            .catch((err) => {
                res.status(500).json(err);
            })
        
    },

    deletedThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
        .then((thought) =>
        !thought
        ? res.status(404).json({ message: "No thought(s) with that ID. Please try again!"})
        : User.findOneUpdate(
            { thoughts: req.params.thoughtId },
            { $pull: { thoughts: req.params.thoughtId }},
            { new: true }
        )
        ).then((thought) => 
        !thought 
        ? res
            .status(404)
            .json({ message: "No thought(s) with that ID. Please try again!"})
            : res.json(thought)
            )
            .catch((err) => {
                res.status(500).json(err);
            })
    },

    newReaction(req, res) {
        Thought.findOneUpdate(
            { id: req.params.thoughtId },
            { $addToSet: { reactions: req.body }},
            { runValidators: true, new: true }
        )
        .then((thought) => 
            !thought
                ? res
                    .status(404)
                    .json({ message: "No thought(s) with that ID. Please try again!"})
                : res.json(thought)
                )
                .catch((err) => res.status(500).json(err));
    },

    deleteReaction(req, res) {
        Thought.findOneUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { _id: req.body.reactionId }}},
            { new: true }
        )
        .then((thought) => 
        !thought 
        ? res
        .status(404)
        .json({ message: "No thought(s) with that ID. Please try again!"})
        :res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
};