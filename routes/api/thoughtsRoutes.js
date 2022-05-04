const router = require('express').Router();
const {
    getEveryThought,
    getOneThought,
    newThought,
    updatedThought,
    deletedThought,
    newReaction,
    deleteReaction,
} = require('../../controllers/thoughtController');

router.route('/').get(getEveryThought).post(newThought);

router.route('/:thoughtId').get(getOneThought).put(updatedThought).delete(deletedThought);

router.route('/:thoughtId/reactions').post(newReaction).delete(deleteReaction);

module.exports = router;