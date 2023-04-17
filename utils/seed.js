const connection = require('../config/connection');
const { Post, User } = require('../models');
const getRandomName = require('./data');

console.log(getRandomName());
connection.on('error', (err) => err); // if while doing seeding / conn to mongoDB, listen for error event listener if we get err, we handle it

connection.once('open', async () => {
  console.log('connected');
  await Post.deleteMany({});
  await User.deleteMany({});

  const users = [];

  for (let i = 0; i < 20; i++) {
    const fullName = getRandomName();
    const first = fullName.split(' ')[0];
    const last = fullName.split(' ')[1];

    users.push({
      first,
      last,
      age: Math.floor(Math.random() * (99 - 18 + 1) + 18),
    });
  }

  await User.collection.insertMany(users); // insert users to db
  console.log(users);
  process.exit(0);
});