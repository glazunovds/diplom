const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    auth0_id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now(),
    },
    project_ids: {
        type: [mongoose.Schema.Types.ObjectId],
        default: [],
    },
    
});

module.exports = mongoose.model('users', UserSchema);