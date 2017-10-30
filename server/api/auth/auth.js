const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

const config = require('../../config/config');

const checkToken = expressJwt({ secret: config.secrets.jwt });

const User = require('../user/userModel');

exports.decodeToken = () => {
  return (req, res, next) => {
    // make it optional to place token on query string
    // if it is, place it on the headers where it should be
    // so checkToken can see it. See follow the 'Bearer 034930493' format
    // so checkToken can see it and decode it
    if (req.headers && Object.prototype.hasOwnProperty.call(req.headers, 'access_token')) {
      req.headers.authorization = `Bearer ${req.headers.access_token}`;
    }

    // this will call next if token is valid
    // and send error if its not. It will attached
    // the decoded token to req.user
    checkToken(req, res, next);
  };
};

exports.getFreshUser = () => {
  return (req, res, next) => {
    User.findById(req.user._id)
      .then((user) => {
        if (!user) {
          // if no user is found it was not
          // it was a valid JWT but didn't decode
          // to a real user in our DB. Either the user was deleted
          // since the client got the JWT, or
          // it was a JWT from some other source
          res.status(401).send('Unauthorized');
        } else {
          // update req.user with fresh user from
          // stale token data
          req.user = user;
          next();
        }
      }, (err) => {
        next(err);
      });
  };
};

exports.verifyUser = () => {
  return function (req, res, next) {
    const id = req.body.id;
    const password = req.body.password;

    // if no username or password then send
    if (!id || !password) {
      res.status(400).send('You need a username and password');
      return;
    }

    // look user up in the DB so we can check
    // if the passwords match for the username
    User.findOne({ id })
      .select('+password')
      .then((user) => {
        if (!user) {
          res.status(401).send('No user with the given username');
          return;
        }

        // checking the passowords here
        if (!user.authenticate(password, user.password)) {
          res.status(401).send('Wrong password');
          return;
        }

        // if everything is good, then attach to req.user and call next so
        // the controller can sign a token from the req.user._id
        req.user = user;
        next();
      }, (err) => {
        next(err);
      });
  };
};

// util method to sign tokens on signup
exports.signToken = (id) => {
  return jwt.sign(
    { _id: id },
    config.secrets.jwt,
    { expiresIn: config.expireTime },
  );
};
