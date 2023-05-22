const mongoose = require("mongoose");
const { Schema } = mongoose;

const AdminSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true },
    password: { type: String, required: true },
    avatar: { type: String, default: "defaulticon.png" },
    role: String,
    date_joined: { type: Date, default: Date.now },
});

const AdminModel = mongoose.model('Admin', AdminSchema);

module.exports = AdminModel;