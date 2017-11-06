const User = require('./userModel');
const _ = require('lodash');
const signToken = require('../auth/auth').signToken;

exports.params = (req, res, next, id) => {
  User.findById(id)
    .exec()
    .then((user) => {
      if (!user) {
        next(new Error('No user with that id'));
      } else {
        req.user = user;
        next();
      }
    }, (error) => {
      res.json(error);
    });
};

exports.get = (req, res, next) => {
  User.find({})
    .exec()
    .then((users) => {
      res.json(users.map((user) => {
        return user.toJson();
      }));
    }, (error) => {
      res.json(error);
    });
};

exports.getOne = (req, res, next) => {
  const user = req.user.toJson();
  res.json(user.toJson());
};

exports.put = (req, res, next) => {
  const user = req.user;
  const update = req.body;

  _.merge(user, update);

  user.save((error, saved) => {
    if (error) {
      res.json(error);
    } else {
      res.json({
        _message: 'User successfully updated!',
        user: saved.toJson(),
      });
    }
  });
};

exports.post = (req, res, next) => {
  if (req.body.password !== req.body.passwordConfirmation) {
    res.status(406).send('Passwords does not match!');
    return;
  }
  const newUser = new User(req.body);

  newUser.save((error, user) => {
    if (error) return res.json(error);

    const token = signToken(user._id);

    res.json({ token: token });
  });
};

exports.delete = (req, res, next) => {
  req.user.remove((error, removed) => {
    if (error) {
      res.json(error);
    } else {
      res.json({
        _message: 'User successfully deleted!',
        user: removed.toJson(),
      });
    }
  });
};

exports.me = (req, res) => {
  res.json(req.user.toJson());
};
