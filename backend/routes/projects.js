const router = require('express').Router();

const Project = require('../models/Project');
const User = require('../models/User');

const tasksRouter = require('./tasks');

function addProjectToUser(user_id, project_id) {
    return User.updateOne({_id: user_id}, {$addToSet: {project_ids: project_id}});
}

function removeProjectFromUser(user_id, project_id) {
    return User.updateOne({_id: user_id}, {$pull: {project_ids: project_id}});
}

router.post('/', async (req, res, next) => {
    try {
        let project = await new Project({
            author_id: req.user._id,
            user_ids: [req.user._id],
            title: req.body.title,
            description: req.body.description,
        }).save();

        await User.updateOne({_id: req.user._id}, {$push: {project_ids: project._id}});

        res.end(JSON.stringify(project));
    }
    catch (err) {
        next(err);
    }
});

router.get('/:project_id', (req, res, next) => {
    Project.findById(req.params.project_id, (err, project) => {
        if (err) return next(err);

        res.end(JSON.stringify(project));
    });
});

router.put('/:project_id', async (req, res, next) => {
    try {
        let project = await Project.findByIdAndUpdate(req.params.project_id, req.body, {new: true});

        res.end(JSON.stringify(project));
    }
    catch (err) {
        next(err);
    }
});

router.delete('/:project_id', async (req, res, next) => {
    try {
        let {project_id} = req.params;

        let project = await Project.findByIdAndRemove(project_id);
        await removeProjectFromUser(req.user._id, project_id);

        res.end(JSON.stringify(project));
    }
    catch (err) {
        next(err);
    }
});

router.put('/:project_id/users/:user_id', async (req, res, next) => {
    try {
        let {project_id, user_id} = req.params;

        let project = await Project.findOneAndUpdate(project_id, {$addToSet: {user_ids: user_id}}, {new: true});
        await addProjectToUser(user_id, project_id);

        res.end(JSON.stringify(project));
    }
    catch (err) {
        next(err);
    }
});

router.delete('/:project_id/users/:user_id', async (req, res, next) => {
    try {
        let {project_id, user_id} = req.params;

        let project = await Project.findOneAndUpdate(project_id, {$pull: {user_ids: user_id}}, {new: true});
        await removeProjectFromUser(user_id, project_id);

        res.end(JSON.stringify(project));
    }
    catch (err) {
        next(err);
    }
});

router.use(tasksRouter);

module.exports = router;