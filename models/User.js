const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Nft = require('./Nft');

const UserSchema = new Schema({
	wallet_id: {
		type: String,
		required: true,
	},
	display_name: {
		type: String,
		required: true,
	},
	email_address: {
		type: String,
		required: true,
	},
	bio: {
		type: String,
		required: false,
		default: 'Artist bio...',
	},
	profile_image: {
		type: String,
		required: false,
		default: 'https://gateway.ipfs.io/ipfs/QmVEBTtEo6q7m5KumcfdkaGn91TZiSN4GgZDtmcr7daNZ4',
	},
	profile_bg_color: {
		type: String,
		require: false,
	},
	profile_featured_id: {
		type: Number,
		require: false,
	},
	email_list: {
		type: Boolean,
		require: false,
		default: false,
	},
    website: {
        type: String,
        require: false,
    },
    twitter: {
        type: String,
        require: false,
    },
    instagram: {
        type: String,
        require: false,
    },
	collections: [
		new Schema({
			title: {
				type: String,
				required: true,
			},
			user_id: {
				type: String,
				required: true,
			},
			creator_id: {
				type: Number,
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
			stars: {
				type: Number,
				default: 0,
				required: true,
			},
			previous_sold: {
				type: Array,
				defaut: [0],
				require: true,
			},
			thumbnail_image: {
				type: String,
				required: true,
			},
			auction_mode: {
				type: Boolean,
				default: false,
				require: true,
			},
			auctions: [
				{
					nft_id: {
						type: Number,
						required: true,
					},
					seller_id: {
						type: Number,
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
						require: false,
					},
					watchers: {
						type: Array,
						require: false,
					},
				},
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
		}),
	],
	liked_nfts: [
		new Schema({
			title: {
				type: String,
				required: true,
			},
			user_id: {
				type: String,
				required: true,
			},
			creator_id: {
				type: Number,
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
			stars: {
				type: Number,
				default: 0,
				required: true,
			},
			previous_sold: {
				type: Array,
				defaut: [0],
				require: true,
			},
			thumbnail_image: {
				type: String,
				required: true,
			},
			auction_mode: {
				type: Boolean,
				default: false,
				require: true,
			},
			auctions: [
				{
					nft_id: {
						type: Number,
						required: true,
					},
					seller_id: {
						type: Number,
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
						require: false,
					},
					watchers: {
						type: Array,
						require: false,
					},
				},
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
		}),
	],
	recently_viewed_nfts: [
		new Schema({
			title: {
				type: String,
				required: true,
			},
			user_id: {
				type: String,
				required: true,
			},
			creator_id: {
				type: Number,
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
			stars: {
				type: Number,
				default: 0,
				required: true,
			},
			previous_sold: {
				type: Array,
				defaut: [0],
				require: true,
			},
			thumbnail_image: {
				type: String,
				required: true,
			},
			auction_mode: {
				type: Boolean,
				default: false,
				require: true,
			},
			auctions: [
				{
					nft_id: {
						type: Number,
						required: true,
					},
					seller_id: {
						type: Number,
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
						require: false,
					},
					watchers: {
						type: Array,
						require: false,
					},
				},
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
		}),
	],
	nft_drafts: [
		new Schema({
			title: {
				type: String,
				required: true,
			},
			user_id: {
				type: String,
				required: true,
			},
			creator_id: {
				type: Number,
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
			date_mint: {
				type: Date,
				default: Date.now,
			},
			likes: {
				type: Number,
				default: 0,
				required: true,
			},
			stars: {
				type: Number,
				default: 0,
				required: true,
			},
			previous_sold: {
				type: Array,
				defaut: [0],
				require: true,
			},
			thumbnail_image: {
				type: String,
				required: true,
			},
			auction_mode: {
				type: Boolean,
				default: false,
				require: true,
			},
			auctions: [
				{
					nft_id: {
						type: Number,
						required: true,
					},
					seller_id: {
						type: Number,
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
						require: false,
					},
					watchers: {
						type: Array,
						require: false,
					},
				},
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
		}),
	],
	starred_nfts: [
		new Schema({
			title: {
				type: String,
				required: true,
			},
			user_id: {
				type: String,
				required: true,
			},
			nft_id: {
				type: Number,
				required: true
			},
			creator_id: {
				type: Number,
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
			date_mint: {
				type: Date,
				default: Date.now,
			},
			likes: {
				type: Number,
				default: 0,
				required: true,
			},
			stars: {
				type: Number,
				default: 0,
				required: true,
			},
			previous_sold: {
				type: Array,
				defaut: [0],
				require: true,
			},
			thumbnail_image: {
				type: String,
				required: true,
			},
			auction_mode: {
				type: Boolean,
				default: false,
				require: true,
			},
			auctions: [
				{
					nft_id: {
						type: Number,
						required: true,
					},
					seller_id: {
						type: Number,
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
						require: false,
					},
					watchers: {
						type: Array,
						require: false,
					},
				},
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
		}),
	],
	date_created: {
		type: Date,
		default: Date.now,
	},
});

module.exports = User = mongoose.model('Users', UserSchema);
