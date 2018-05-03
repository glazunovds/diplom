const router = require('express').Router();

const Task = require('../models/Task');
const Project = require('../models/Project');

const attachmentsRouter = require('./attachments');
const commentsRouter = require('./comments');

function addTaskToProject(project_id, task_id) {
    return Project.updateOne({_id: project_id}, {$addToSet: {task_ids: task_id}});
}

function removeTaskFromProject(project_id, task_id) {
    return Project.updateOne({_id: project_id}, {$pull: {task_ids: task_id}});
}

router.post('/:project_id/tasks', async (req, res, next) => {
    try {
        let {assignee_id, title, description, priority} = req.body;

        let task = await new Task({
            author_id: req.user._id,
            project_id: req.params.project_id,
            assignee_id,
            title,
            description,
            priority,
        }).save();

        await addTaskToProject(req.params.project_id, task.id);

        res.end(JSON.stringify(task));
    }
    catch (err) {
        next(err);
    }
});

router.get('/:project_id/tasks/:task_id', async (req, res, next) => {
    try {
        let task = await Task.findById(req.params.task_id);

        res.end(JSON.stringify(task));
    }
    catch (err) {
        next(err);
    }
});

router.put('/:project_id/tasks/:task_id', async (req, res, next) => {
    try {
        let task = await Task.findByIdAndUpdate(req.params.task_id, req.body, {new: true});

        res.end(JSON.stringify(task));
    }
    catch (err) {
        next(err);
    }
});

router.delete('/:project_id/tasks/:task_id', async (req, res, next) => {
    try {
        let task = await Task.findByIdAndRemove(req.params.task_id);
        await removeTaskFromProject(req.params.project_id, req.params.task_id);

        res.end(JSON.stringify(task));
    }
    catch (err) {
        next(err);
    }
});

router.use(attachmentsRouter);
router.use(commentsRouter);

module.exports = router;