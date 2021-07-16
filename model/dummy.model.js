const mongoose = require("mongoose")
const Schema = mongoose.Schema

module.exports = mongoose.model("dummy", new Schema({
    name: String
}))