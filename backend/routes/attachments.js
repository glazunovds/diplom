const router = require('express').Router();

const Attachment = require('../models/Attachment');
const Task = require('../models/Task');

function addAttachmentToTask (task_id, attachment_id) {
    return Task.updateOne({_id: task_id}, {$addToSet: {attachment_ids: attachment_id}});
}

function removeAttachmentFromTask(task_id, attachment_id) {
    return Task.updateOne({_id: task_id}, {$pull: {attachment_ids: attachment_id}});
}

router.post('/:project_id/tasks/:task_id/attachments', async (req, res, next) => {
    try {
        let {url} = req.body;

        let attachment = await new Attachment({
            url,
        }).save();

        await addAttachmentToTask(req.params.task_id, attachment._id);

        res.end(JSON.stringify(attachment));
    }
    catch (err) {
        next(err);
    }
});

router.get('/:project_id/tasks/:task_id/attachments/:attachment_id', async (req, res, next) => {
    try {
        let attachment = await Attachment.findById(req.params.attachment_id);

        res.end(JSON.stringify(attachment));
    }
    catch (err) {
        next(err);
    }
});

router.put('/:project_id/tasks/:task_id/attachments/:attachment_id', async (req, res, next) => {
   try {
       let attachment = await Attachment.findByIdAndUpdate(req.params.attachment_id, req.body, {new: true});

       res.end(JSON.stringify(attachment));
   }
   catch (err) {
       next(err);
   }
});

router.delete('/:project_id/tasks/:task_id/attachments/:attachment_id', async (req, res, next) => {
    try {
        let attachment = await Attachment.findByIdAndRemove(req.params.attachment_id);

        await removeAttachmentFromTask(req.params.task_id, req.params.attachment_id);

        res.end(JSON.stringify(attachment));
    }
    catch (err) {
        next(err);
    }
});

module.exports = router;