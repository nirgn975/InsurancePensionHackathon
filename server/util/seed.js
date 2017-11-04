const _ = require('lodash');
const logger = require('./logger');

const User = require('../api/user/userModel');
const dummyUsers = require('./dummyUsers');
const Graph = require('../api/graph/graphModel');
const dummyStocks = require('./dummyStocks');
const dummyBonds = require('./dummyBonds');

const environment = process.env.NODE_ENV;

logger.log(['Seeding the Database']);

const cleanDB = () => {
  logger.log(['... cleaning the DB']);
  const cleanPromises = [User, Graph]
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
  const newUsers = dummyUsers.users.map((user, i) => {
    return createDoc(User, user);
  });

  return Promise.all(newUsers)
    .then((savedUsers) => {
      return _.merge({ users: savedUsers }, data || {});
    });
};

const createBonds = (data) => {
  const newBonds = dummyBonds.bonds.map((bond, i) => {
    bond.kind = 'bond';
    return createDoc(Graph, bond);
  });

  return Promise.all(newBonds)
    .then((savedBonds) => {
      return _.merge({ bonds: savedBonds }, data || {});
    });
};

const createStocks = (data) => {
  const newStocks = dummyStocks.stocks.map((stock, i) => {
    stock.kind = 'stock';
    return createDoc(Graph, stock);
  });

  return Promise.all(newStocks)
    .then(() => [`In ${environment} mode. Seeded DB with ${dummyUsers.users.length} Users, ${dummyStocks.stocks.length} Stocks, ${dummyBonds.bonds.length} Bonds`]);
};

cleanDB()
  .then(createUsers)
  .then(createBonds)
  .then(createStocks)
  .then(logger.log.bind([logger]))
  .catch(logger.log.bind([logger]));
