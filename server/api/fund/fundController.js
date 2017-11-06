const Fund = require('./fundModel');

exports.ownData = (req, res, next) => {
    Fund.find({ user: req.user._id })
        .select(['-_id', '-__v', '-kind'])
        .exec()
        .then((fundData) => {
            res.json({own_data: fundData.length != 0});
        }, (error) => {
            res.json(error);
        });
};
