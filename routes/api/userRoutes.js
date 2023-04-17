const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../../controllers/userController');

// /api/users 
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;

// BUG WHEN TRYING TO ADD FRIEND WITH ID - POST req localhost:3001/api/users/6439f239e34d0f7d7e7f7fe7/friends/6439f241e34d0f7d7e7f7fe9 not working in Insomnia. Getting "ImmutableField" error...:
// {
//	"ok": 0,
//	"code": 66,
//	"codeName": "ImmutableField"
// }