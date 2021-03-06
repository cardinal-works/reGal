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
	profile_theme: {
		type: String,
		required: false,
	},

	email_list: {
		type: Boolean,
		required: false,
		default: false,
	},
	website: {
		type: String,
		required: false,
	},
	twitter: {
		type: String,
		required: false,
	},
	instagram: {
		type: String,
		required: false,
	},
	pending_value: {
		type: Number,
		required: false,
	},
	bidding: {
		type: Array,
		required: false,
	},
	profile_featured_nft: { 
		type: String, 
		required: false
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
		}),
	],
	liked_nfts: [
		{ 
			type: String, 
			required: false
		}
	],
	recently_viewed_nfts: [
		{ 
			type: String, 
			capped: true,
			size: 5,
			required: false
		}
	],
	saved_nfts: [
		{ 
			type: String, 
			required: false
		}
	],
	date_created: {
		type: Date,
		default: Date.now,
	},
});

module.exports = User = mongoose.model('Users', UserSchema);
