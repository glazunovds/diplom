const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    author_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    assignee_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: mongoose.Schema.Types.Number,
        enum: [0, 1, 2, 3],
        default: 0,
    },
    priority: {
        type: mongoose.Schema.Types.Number,
        enum: [0, 1, 2, 3],
        default: 1,
    },
    hours_spent: {
        type: mongoose.Schema.Types.Number,
        default: 0,
    },
    attachment_ids: {
        type: [mongoose.Schema.Types.ObjectId],
        default: [],
    },
    comment_ids: {
        type: [mongoose.Schema.Types.ObjectId],
        default: [],
    },
    created_at: {
        type: Date,
        default: Date.now(),
    },
}, {
    versionKey: false,
});

module.exports = mongoose.model('tasks', TaskSchema);