const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// ** TESTING AN AUCTION DB MANAGMENT STRATEGY NOT CURRENTLY IMPLMENTED ** //
const CommentSchema = new Schema({
	nft_id: {
		type: Number, 
		required: false,
	},
    user: {
        user_id: {
            type: Number,
            required: true
        },
        username: {
            type: String,
            required: true
        }
    },
    comment: {
        type: String,
        required: true
    },
    up_votes: {
        type: Number,
        required: false
    },
    down_votes: {
        type: Number,
        required: false
    }

});

module.exports = Auction = mongoose.model('comments', CommentSchema);
