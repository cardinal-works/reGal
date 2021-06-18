const Comment = require("../models/Comment");

module.exports = {
  get: function (req, res, next) {
    Comment.findOne({ _id: req.params.id }).then((comment) => {
      if (comment) {
        return res.status(200).send(comment);
      } else {
        return res.status(400).send({ message: "Comment not found" });
      }
    });
  },
  create: function (req, res, next) {
    Comment.create(req.body, function (err, response) {
        if (err) {
        res.status(500).send({ message: "Something went wrong" });
        } else {
        res.status(200).send(response);
        }
    });
  },
  update: function (req, res, next) {
    Comment.findByIdAndUpdate(
      req.body._id,
      req.body,
      { new: true },
      (err, response) => {
        if (err) {
          return res.status(500).send(err);
        }
        return res.status(200).send(response);
      }
    );
  },
  delete: function (req, res, next) {
    Comment.findByIdAndRemove(req.params.id, (err, response) => {
      if (err) {
        return res.status(500).send(err);
      }
      return res.status(200).send(response);
    });
  },
};
