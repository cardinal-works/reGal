const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//const Tag = require("./Tag");

const NftSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    creator: {
        type: String,
        required: true
    },
    nft_description: {
        type: String,
        required: true
    },
    nft_id: {
        type: String,
        required: true
    },
    thumbnail_image: {
        type: String,
        required: true
    },
    date_mint: {
        type: Date,
        default: Date.now
    },
    likes: {
        type: Number,
        default: 0,
        required: true
    },
    asking_bid: {
        type: Number,
        default: null,
        require: true
    },
    previous_sold: {
        type: [Number],
        defaut: null,
        require: true
    },
    auction_duration: {
        type: String,
        default: null,
        require: true
    },
    auction_startDate: {
        type: String,
        default: null,
        require: true
    },
    auction_mode: {
        type: Boolean,
        default: false,
        require: true
    },
    auction_ended: {
        type: Boolean,
        default: false,
        require: true
    },
    auction_id: {
        type: Number,
        default: null,
        require: true
    },
    tags: [
        new Schema({
            name: {
                type: String,
                required: false
            },
            popularity: {
                type: Number,
                required: false
            }
        })
    ],
})

module.exports = Nft = mongoose.model("Nfts", NftSchema);