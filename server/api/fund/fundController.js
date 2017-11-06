const Fund = require('./fundModel');

exports.ownData = (req, res, next) => {
  const timeDiff = Math.abs(req.user.dates.registrationDate.getTime() - req.user.dates.expectedDataDate.getTime());
  const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

  Fund.find({ user: req.user._id })
    .select(['-_id', '-__v', '-kind'])
    .exec()
    .then((fundData) => {

      if(fundData.length !== 0) {
        res.json({ own_data: fundData });
      }

      res.json({ own_data: diffDays });
    }, (error) => {
      res.json(error);
    });
};
