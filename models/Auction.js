const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// ** TESTING AN AUCTION DB MANAGMENT STRATEGY NOT CURRENTLY IMPLMENTED ** //
const AuctionSchema = new Schema({
	nft_id: {
		type: Number, 
		required: false,
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
});

module.exports = Auction = mongoose.model('auctions', AuctionSchema);
