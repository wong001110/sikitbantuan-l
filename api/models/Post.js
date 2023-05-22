const mongoose = require("mongoose");
const { Schema } = mongoose;

const PostSchema = new Schema({
    event: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Event' },
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    postTitle: { type: String, required: true },
    postCategory: [{ type: String, required: true }],
    postContent: { type: String, required: true },
    postCover: { type: String, required: true },
    post_time: { type: Date, default: Date.now },
});

const PostModel = mongoose.model('Post', PostSchema);

module.exports = PostModel;