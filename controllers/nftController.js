const Nft = require("../models/Nft");
const User = require("../models/User");

module.exports = {
  getAll: function (req, res, next) {
      Nft.find(req.body)
      .then((response) => {
        return res.status(200).send(response);
      })
      .catch((err) => {
        return res.status(400).send(err);
      })
  },
  get: function (req, res, next) {
    Nft.find({ nft_id: req.params.id }).then((nft) => {
      if (nft) {
        return res.status(200).send(nft);
      } else {
        return res.status(400).send({ message: "Nft not found" });
      }
    });
  },
  sort: function (req, res, next) {
    Nft.find().sort({[req.body.field]: req.body.sort}).limit(req.body.limit).then((nfts) => {
      if(nfts)
      {
        return res.status(200).send(nfts);
      } 
      else 
      {
        return res.status(400).send({ message: "No results found" });
      }
    })
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
  updateLikes: function (req, res, next) {
    const counter = req.body.action === 'Like' ? 1 : -1;
    Nft.findByIdAndUpdate(req.body.nftId, {$inc: {likes: counter}}, {new: true}, (err, response) => {
        if(err)
        {
          return res.status(500).send(err);
        }
        if(counter == 1)
        {
          User.findByIdAndUpdate(
            req.body.userId, 
            { $push: { liked_nfts: req.body.nftId } }, 
            { new: true }, 
            ( err, user ) => {
              if(err)
              {
                return res.status(500).send(err);
              }
              return res.status(200).send({user, nft: response});
            })
        }
        else
        {
          User.findByIdAndUpdate(
            req.body.userId, 
            { $pull: { liked_nfts: req.body.nftId } },
            { new: true }, 
            ( err, user ) => {
              if(err)
              {
                return res.status(500).send(err);
              }
              return res.status(200).send({user, nft: response});
            })
        }
    });
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
