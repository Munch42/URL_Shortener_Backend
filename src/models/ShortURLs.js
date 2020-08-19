const mongoose = require("mongoose");

const ShortURLSchema = new mongoose.Schema({
    targetURL: { type: String, required: true },
    shortID: { type: String, required: true }
});

const ShortURL = module.exports = mongoose.model("ShortURLS", ShortURLSchema);