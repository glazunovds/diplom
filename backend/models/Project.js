const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    author_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    task_ids: {
        type: [mongoose.Schema.Types.ObjectId],
        default: [],
    },
    user_ids: {
        type: [mongoose.Schema.Types.ObjectId],
        default: [],
    },
    title: {
        type: String,
        required: true,
    },
    description: {
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

module.exports = mongoose.model('projects', ProjectSchema);