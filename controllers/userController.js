const { User } = require('../models');

module.exports = {
    
    getEveryUser(req, res) {
        User.find({})
            .then((everyUser) => res.json(everyUser))
            .catch((err) =>
                res.status(500).json(err));
    },
    getOneUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .populate('thoughts')
            .then((user) => !user
                ? res.status(404).json({ message: "No thought(s) with that ID. Please try again!" })
                : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    postNewUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },
    updatedUser(req, res) {
        User.findOneUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "No thought(s) with that ID. Please try again!" })
                    : res.json(user)
            )
            .catch((err) => {
                res.status(500).json(err);
            });
    },
    deletedUser(req, res) {
        User.findOneRemove({ _id: req.params.userId })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "No thought(s) with that ID. Please try again!" })
                    : res.json(user)
            )
            .catch((err) => {
                res.status(500).json(err);
            },
            )
    },
    addNewFriendRequest(req, res) {
        User.findOneUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res
                        .status(404)
                        .json({ message: "No thought(s) with that ID. Please try again!" })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));

    },
    removeCurrentFriend(req, res) {
        User.findOneUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
            .then((friend) =>
                !friend
                    ? res
                        .status(404)
                        .json({ message: "No thought(s) with that ID. Please try again!" })
                    : res.json(friend)
            )
            .catch((err) => res.status(500).json(err));
    },
};