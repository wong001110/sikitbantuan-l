const mongoose = require("mongoose");
const { Schema } = mongoose;

const SponsorSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    event: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Event' },
    wish: { type: String, required: true },
    sponsorAmount: { type: Number, required: true },
    sponsor_time: { type: Date, default: Date.now },
});

const SponsorModel = mongoose.model('Sponsor', SponsorSchema);

module.exports = SponsorModel;