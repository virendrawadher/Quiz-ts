const mongoose = require("mongoose")
const Schema = mongoose.Schema

exports.leadBoard = mongoose.model("LeadBoard", new Schema({
    name: {
        type: String,
        required: "User name should not empty"
    }
}))