const User = require("../models/User");

module.exports = {
  get: function (req, res, next) {
    User.findOne({ wallet_id: req.params.id }).then((user) => {
      if (user) {
        return res.status(200).send(user);
      } else {
        return res.status(400).send({ message: "User not found" });
      }
    });
  },
  create: function (req, res, next) {
    const email = req.body.email;
    User.findOne({ email_address: email }).then((user) => {
      if (user) {
        return res.status(400).json({ message: "Email already exists" });
      } else {
        User.create(req.body, function (err, response) {
          if (err) {
            res.status(500).send({ message: "Something went wrong" });
          } else {
            res.status(200).send(response);
          }
        });
      }
    });
  },
  update: function (req, res, next) {
    User.findByIdAndUpdate(
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
  updateBookmarks: function (req, res, next) {
    if( req.body.action == "add")
    {
      User.findByIdAndUpdate(
        req.body.userId, 
        { $push: { saved_nfts: req.body.nftId } }, 
        {new: true}, 
        (err, response) => {
          if (err) {
            return res.status(500).send(err);
          }
          return res.status(200).send(response);
      });
    }
    else 
    {
      User.findByIdAndUpdate(
        req.body.userId, 
        { $pull: { saved_nfts: req.body.nftId } }, 
        {new: true}, 
        (err, response) => {
          if (err) {
            return res.status(500).send(err);
          }
          return res.status(200).send(response);
      });
    }
  },
  updateRecentlyViewed: function (req, res, next) {
    User.findByIdAndUpdate(req.body.userId, 
      { $push: { recently_viewed_nfts: { $each: [req.body.nftId] }, $slice: -5} }, 
      {new: true}, 
      (err, response) => {
        if (err) {
          return res.status(500).send(err);
        }
        return res.status(200).send(response);
    });
  },
  delete: function (req, res, next) {
    User.findByIdAndRemove(req.params.id, (err, response) => {
      if (err) {
        return res.status(500).send(err);
      }
      return res.status(200).send(response);
    });
  },
};
