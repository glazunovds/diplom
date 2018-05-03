const router = require('express').Router();

const Comment = require('../models/Comment');
const Task = require('../models/Task');

function addCommentToTask(task_id, comment_id) {
    return Task.updateOne({_id: task_id}, {$addToSet: {comment_ids: comment_id}});
}

function removeCommentFromTask({task_id, comment_id}) {
    return Task.updateOne({_id: task_id}, {$pull: {comment_ids: comment_id}});
}

router.get('/:project_id/tasks/:task_id/comments/:comment_id', async (req, res, next) => {
    try {
        let comment = await Comment.findById(req.params.comment_id);

        res.end(JSON.stringify(comment));
    }
    catch (err) {
        next(err);
    }
});

router.post('/:project_id/tasks/:task_id/comments', async (req, res, next) => {
    try {
        let {text} = req.body;

        let comment = await new Comment({
            author_id: req.user._id,
            text,
        }).save();

        await addCommentToTask(req.params.task_id, comment._id);

        res.end(JSON.stringify(comment));
    }
    catch (err) {
        next(err);
    }
});

router.put('/:project_id/tasks/:task_id/comments/:comment_id', async (req, res, next) => {
    try {
        let comment = await Comment.findByIdAndUpdate(req.params.comment_id, req.body);

        res.end(JSON.stringify(comment));
    }
    catch (err) {
        next(err);
    }
});

router.delete('/:project_id/tasks/:task_id/comments/:comment_id', async (req, res, next) => {
    try {
        let comment = await Comment.findByIdAndRemove(req.params.comment_id);

        await removeCommentFromTask(req.params.task_id, req.params.comment_id);

        res.end(JSON.stringify(comment));
    }
    catch (err) {
        next(err);
    }
});

module.exports = router;