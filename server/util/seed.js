const logger = require('./logger');

const User = require('../api/user/userModel');
const dummyUsers = require('./dummyUsers');

const [users] = dummyUsers.users;

logger.log(['Seeding the Database']);

const cleanDB = () => {
  logger.log(['... cleaning the DB']);
  const cleanPromises = [User]
    .map((model) => {
      return model.remove().exec();
    });
  return Promise.all(cleanPromises);
};

const createDoc = (Model, doc) => {
  return new Promise((resolve, reject) => {
    new Model(doc).save((err, saved) => {
      return err ? reject(err) : resolve(saved);
    });
  });
};

const createUsers = (data) => {
  const newUsers = users.map((user, i) => {
    return createDoc(User, user);
  });

  return Promise.all(newUsers)
    .then(() => [`Seeded DB with ${users.length} Users`]);
};

cleanDB()
  .then(createUsers)
  .then(logger.log.bind([logger]))
  .catch(logger.log.bind([logger]));
