const router = require('express').Router();
const {
    getAllUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend

} = require('../../controllers/user-controller');

// get and post routes for /api/users routes
router
    .route('/')
    .get(getAllUser)
    .post(createUser);

//get put and delete for one entry from /api/routes/:id 
router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

//post and delete routes for friends at /api/:id/friends/:friendId
router
    .route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(removeFriend)

module.exports = router;