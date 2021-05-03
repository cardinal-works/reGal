const Nft = require("../models/Nft");

module.exports = {
  getAll: function (req, res, next) {
    if (req.body) {
      Nft.find(req.body)
      .then((response) => {
        return res.status(200).send(response);
      })
      .catch((err) => {
        return res.status(400).send(err);
      })
    }
  },
  get: function (req, res, next) {
    Nft.findOne({ _id: req.params.id }).then((user) => {
      if (user) {
        return res.status(200).send(user);
      } else {
        return res.status(400).send({ message: "User not found" });
      }
    });
  },
  create: function (req, res, next) {
    console.log({ ...req.body, user_id: req.params.id })
    Nft.create(
      { ...req.body, user_id: req.params.id },
      function (err, response) {
        if (err) {
          res.status(500).send({ message: "Something went wrong", err });
        } else {
          res.status(200).send(response);
        }
      }
    );
  },
  update: function (req, res, next) {
    Nft.findByIdAndUpdate(
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
    Nft.findByIdAndRemove(req.params.id, (err, response) => {
      if (err) {
        return res.status(500).send(err);
      }

      return res.status(200).send(response);
    });
  },
};
