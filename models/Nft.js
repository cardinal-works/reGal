const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NftSchema =  new Schema({
        title: {
            type: String,
            required: true,
        },
        user_id: {
            type: String,
            required: true,
        },
        creator_name: {
            type: String,
            required: true,
        },
        nft_description: {
            type: String,
            required: true,
        },
        nft_id: {
            type: Number,
            required: true,
        },
        date_mint: {
            type: Date,
            default: Date.now,
        },
        likes: {
            type: Number,
            default: 0,
            required: true,
        },
        comments: {
            type: Array,
            required: false
        },
        views: {
            type: Number,
            default: 0,
            required: true,
        },
        previous_sold: {
            type: Array,
            default: [0],
            required: false,
        },
        thumbnail_image: {
            type: String,
            required: true,
        },
        auction_mode: {
            type: Boolean,
            default: false,
            required: false,
        },
        auctions: [
            new Schema({
                nft_id: {
                    type: Number,
                    required: false,
                },
                seller_id: {
                    type: String,
                    required: false,
                },
                seller_name: {
                    type: String,
                    required: false,
                },
                start_date: {
                    type: Number,
                    required: false,
                },
                asking_bid: {
                    type: Number,
                    required: false,
                },
                end_date: {
                    type: Number,
                    required: false,
                },
                bids: {
                    type: Array,
                    required: false,
                },
                watchers: {
                    type: Array,
                    required: false,
                },
            }),
        ],
        tags: [
            new Schema({
                name: {
                    type: String,
                    required: false,
                },
                popularity: {
                    type: Number,
                    required: false,
                },
            }),
        ],
    })
module.exports = Nft = mongoose.model("Nfts", NftSchema);