const mongoose = require("mongoose");
const { Schema } = mongoose;

const ReviewSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    event: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Event' },
    review: String,
    rating: Number,
    review_time: { type: Date, default: Date.now },
});

const ReviewModel = mongoose.model('Review', ReviewSchema);

module.exports = ReviewModel;