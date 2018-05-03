const User = require('./models/User');

module.exports = async (req, res, next) => {
    let profile = req.user;

    try {
        let user = await User.findOne({auth0_id: profile.sub});

        if (!user) {
            user = await new User({
                auth0_id: profile.sub,
                name: profile.name,
                email: profile.email,
            }).save();
        }

        req.login(user, (err) => {
            if (err) return next(err);

            next();
        });
    }
    catch (err) {
        next(err);
    }
};