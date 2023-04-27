const { User, Thought } = require('../models');

const userController = {
  // get all users
  async getUsers(req, res) {
    try {
      const userData = await User.find()
        .select('-__v') // dont show prev version #
      res.json(userData);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  async getSingleUser(req, res) {
    // get single user by _id
    try {
      const userData = await User.findOne({ _id: req.params.userId })
        .select('-__v')
        .populate('friends')
        .populate('thoughts')
      !userData
        ? res.status(404).json({ message: 'No user with that ID!' })
        : res.json(userData);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  // create a new user
  async createUser(req, res) {
    try {
      const userData = await User.create(req.body)
      res.json(userData);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  // update user
  async updateUser(req, res) {
    try {
      const userData = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      )
      !userData
        ? res.status(404).json({ message: 'No user with that ID!' })
        : res.json(userData);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  // delete user
  async deleteUser(req, res) {
    try {
      const userData = await User.findOneAndDelete({ _id: req.params.userId })
      if(!userData) {
        res.status(404).json({ message: 'No user with that ID!' })
      }
      await Thought.deleteMany({ _id: { $in: userData.thoughts } }) // delete any thought that has the ID that comes from userData = user that we foundOne and deleted
      res.json({ message: 'User and associated thoughts have been deleted!' })
    } catch (error) {
      res.status(500).json(error);
    }
  },
  // add friend
  async addFriend(req, res) {
    try {
      const userData = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
        )
      !userData
        ? res.status(404).json({ message: 'No user with that ID!' })
        : res.json(userData);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  // remove friend
  async removeFriend(req, res) {
    try {
      const userData = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
        )
      !userData
        ? res.status(404).json({ message: 'No user with that ID!' })
        : res.json(userData);
    } catch (error) {
      res.status(500).json(error);
    }
  }
};

module.exports = userController;