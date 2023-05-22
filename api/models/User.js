const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
    follower: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    user_name: String,
    user_email: { type: String, unique: true },
    password: String,
    user_avatar: String,
    user_cover: String,
    user_desc: { type: String, default: "Together, we can make a difference in our community." },
    about: { type: String, default: "This person haven't introduce himself~" },
    website: String,
    contact: String,
    social: String,
    date_joined: { type: Date, default: Date.now },
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;