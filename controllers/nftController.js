const Nft = require("../models/Nft");

module.exports = {
    getAll: function(req, res, next) {
        Nft.find(req.body).then( nfts => {
            if(nfts.length) 
            {
                return res.status(200).send(nfts);
            } else {
                return res.status(400).send({ message: "No results found" })
            }
        }) 
    },
    get: function(req, res, next) {
        Nft.findOne({ _id: req.params.id }).then( user => {
            if(user) 
            {
                return res.status(200).send(user);
            } else {
                return res.status(400).send({ message: "User not found" })
            }
        })
    },
    create: function(req, res, next) {
        Nft.create( {...req.body, user_id: req.params.id}, function(err, response) {
            if(err)
            {
                res.status(500).send({ message: "Something went wrong" });
            } else {
                res.status(200).send(response);
            }
        })
    },
    update: function(req, res, next) {
        Nft.findByIdAndUpdate( req.body._id, req.body, {new: true}, (err, response) => {
            if(err) {
                return res.status(500).send(err);
            }

            return res.status(200).send(response);
        })
    },
    delete: function(req, res, next) {
        Nft.findByIdAndRemove( req.params.id, (err, response) => {
            if(err) {
                return res.status(500).send(err);
            }

            return res.status(200).send(response)
        })
    }
}