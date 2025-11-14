const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String },
    rating: {type: Number, min: 1, max: 5 },
    review: { type: String },
    pages: { type: Number },
    status: {type: String, enum: ['Reading', 'Completed', 'To Read'], default: 'To Read' },
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true }
});

module.exports = mongoose.model('book', bookSchema);