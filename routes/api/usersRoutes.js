const router = require('express').Router();
const {
    getEveryUser,
    getOneUser,
    postNewUser,
    updatedUser,
    deletedUser,
    addNewFriendRequest,
    removeCurrentFriend,
} = require('../../controllers/userController');

router.route('/').get(getEveryUser).post(postNewUser);

router.route('/:userId').get(getOneUser).put(updatedUser).delete(deletedUser);

router.route('/:userId/friends/:friendId').post(addNewFriendRequest).delete(removeCurrentFriend);

module.exports = router;