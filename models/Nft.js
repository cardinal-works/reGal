const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//const Tag = required("./Tag");
// _id: string;
// title: string;
// user_id: string;
// creator_id: number;
// creator_name: string;
// nft_description: string;
// nft_id: number;
// date_mint: Date;
// likes: number;
// stars: number;
// previous_sold: Array<number>;
// thumbnail_image: string;
// auction_mode: boolean;
// auctions: [
//     {
//         seller_id: number;
//         seller_name: string;
//         start_date: number;
//         asking_bid: number;
//         end_date: number;
//         bids: Array<number>;
//         watchers: Array<number>;
//     }
// ];
// tags: [{ _id: string; name: string; popularity: number }];

const NftSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
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
        required: false
    },
    views: {
        type: Number,
        default: 0,
        required: false
    },
    previous_sold: {
        type: Array,
        defaut: [0],
        required: false
    },
    thumbnail_image: {
        type: String,
        required: true
    },
    auction_mode: {
        type: Boolean,
        default: false,
        required: false, 
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
            required: true,
        },
        watchers: {
            type: Array, 
            required: true, 
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