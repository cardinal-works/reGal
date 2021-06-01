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
    creator_id: {
        type: Number,
        required: true
    },
    creator_name: {
        type: String, 
        required: true
    },
    nft_description: {
        type: String,
        required: true
    },
    nft_id: {
        type: Number,
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
    stars: {
        type: Number,
        default: 0,
        required: true
    },
    previous_sold: {
        type: Array,
        defaut: [0],
        require: true
    },
    thumbnail_image: {
        type: String,
        required: true
    },
    auction_mode: {
        type: Boolean,
        default: false,
        require: true
    },
    auctions: [{
        nft_id: {
            type: Number,
            required: true,
        },
        seller_id: {
            type: Number,
            required: true
        },
        seller_name: {
            type: String,
            required: true
        },
		start_date: {
            type: Number,
            required: true
        },
		asking_bid: {
            type: Number,
            required: true
        },
		end_date: {
            type: Number,
            required: true
        },
		bids: {
            type: Array, 
            require: true,
        },
        watchers: {
            type: Array, 
            require: true, 
        }
    }],
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