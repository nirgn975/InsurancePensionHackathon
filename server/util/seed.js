const _ = require('lodash');
const logger = require('./logger');

const User = require('../api/user/userModel');
const dummyUsers = require('./dummyUsers');

const Graph = require('../api/graph/graphModel');
const dummyStocks = require('./dummyStocks');
const dummyBonds = require('./dummyBonds');
const dummyOpenPension = require('./dummyOpenPensionDB');
const openPension = require('../api/openPension/openPensionModel');

const Fund = require('../api/fund/fundModel');
const dummyFunds = require('./dummyFunds');

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

const createOpenPension = (data) => {
  const newOpenPension = dummyOpenPension.openPension.map((line, i) => {
    return createDoc(openPension, line);
  });

  return Promise.all(newOpenPension)
    .then((savedOpenPension) => {
      return _.merge({ openPension: savedOpenPension }, data || {});
    });
};

const createFunds = (data) => {
  /* eslint-disable array-callback-return */

  const newFunds = dummyFunds.funds.map((fund, i) => {
    User.find({ id: fund.id })
      .exec()
      .then((user) => {
        fund.user = user[0]._id;
        return createDoc(Fund, fund);
      }, (error) => {
        console.log(error);
      });
  });

  /* eslint-enable array-callback-return */

  return Promise.all(newFunds)
    .then((savedFunds) => {
      return _.merge({ funds: savedFunds }, data || {});
    });
};

const createStocks = (data) => {
  const newStocks = dummyStocks.stocks.map((stock, i) => {
    stock.kind = 'stock';
    return createDoc(Graph, stock);
  });

  return Promise.all(newStocks)
    .then(() => [`In ${environment} mode. Seeded DB with ${dummyUsers.users.length} Users, ${dummyStocks.stocks.length} Stocks, ${dummyBonds.bonds.length} Bonds, ${dummyFunds.funds.length} Funds, ${dummyOpenPension.openPension.length} Open Pension.`]);
};

cleanDB()
  .then(createUsers)
  .then(createOpenPension)
  .then(createBonds)
  .then(createFunds)
  .then(createStocks)
  .then(logger.log.bind([logger]))
  .catch(logger.log.bind([logger]));
