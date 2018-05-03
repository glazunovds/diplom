const mongoose = require('mongoose');

const AttachmentSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
    }
}, {
    versionKey: false,
});

module.exports = mongoose.model('attachments', AttachmentSchema);