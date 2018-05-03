const router = require('express').Router();

const Project = require('../models/Project');
const User = require('../models/User');

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
        console.error(err);
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
        let project = await Project.findByIdAndRemove(req.params.project_id);
        await User.updateOne({_id: project.author_id}, {$pull: {project_ids: project._id}});

        res.end(JSON.stringify(project));
    }
    catch (err) {
        next(err);
    }
});

router.put('/:project_id/users/:user_id', (req, res, next) => {
    Project.findOneAndUpdate(req.params.project_id, {$addToSet: {user_ids: req.params.user_id}}, {new: true}, (err, project) => {
        if (err) return next(err);

        res.end(JSON.stringify(project));
    });
});

module.exports = router;