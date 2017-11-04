const Graph = require('./graphModel');

exports.getByKind = (req, res, next) => {
  Graph.find({ kind: req.params.kind })
    .select(['-_id', '-__v', '-kind'])
    .exec()
    .then((graphData) => {
      res.json(graphData);
    }, (error) => {
      res.json(error);
    });
};
