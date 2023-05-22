const mongoose = require("mongoose");
const { Schema } = mongoose;

const EventSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    eventStatus: { type: String, default: 'Pending' },
    eventTitle: { type: String, required: true },
    eventLocation: { type: String, required: true },
    eventDesc: { type: String, required: true },
    eventCategory: [{ type: String, required: true }],
    eventPhotos: [String],
    eventCover: { type: String, required: true },
    eventSponsored: { type: Boolean, default: false },
    eventParticipants: { type: Number, required: true },
    eventStartTime: { type: Date, required: true },
    eventEndTime: { type: Date, required: true },
});

const EventModel = mongoose.model('Event', EventSchema);

module.exports = EventModel;