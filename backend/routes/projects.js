const router = require('express').Router();

const Project = require('../models/Project');
const User = require('../models/User');

router.post('/', (req, res, next) => {
    try {
        new Project({
            author_id: req.user.id,
            user_ids: [req.user.id],
            title: req.body.title,
            description: req.body.description,
        }).save((err, project) => {
            if (err) return next(err);

            res.end(JSON.stringify(project));
        });
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

router.put('/:project_id', (req, res, next) => {
    Project.findByIdAndUpdate(req.params.project_id, req.body, {new: true}, (err, project) => {
        if (err) return next(err);

        res.end(JSON.stringify(project));
    });
});

router.delete('/:project_id', (req, res, next) => {
    Project.findByIdAndRemove(req.params.project_id, (err, project) => {
        if (err) return next(err);

        res.end(JSON.stringify(project));
    })
});

router.put('/:project_id/users/:user_id', (req, res, next) => {
        Project.findOneAndUpdate(req.params.project_id, {$addToSet: {user_ids: req.params.user_id}}, {new: true}, (err, project) => {
            if (err) return next(err);

            res.end(JSON.stringify(project));
        });
});

module.exports = router;