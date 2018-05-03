const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    author_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now(),
    },
}, {
    versionKey: false,
});

module.exports = mongoose.model('comments', CommentSchema);