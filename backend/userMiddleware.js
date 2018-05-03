const User = require('./models/User');

const ManagementClient = require('auth0').ManagementClient;

const auth = new ManagementClient({
    domain: 'glazunov.eu.auth0.com',
    clientId: '38kYWZEnammXWakaZTnBlV8cgEgYuqVK',
    clientSecret: 'T4IX6UwzDLEJQvyITHCBuPwLhpdBTZK4RKK7LFm_Na4YP_MY_ZpctqCfuQTsJjOp',
    scope: 'read:users',
});

module.exports = async (req, res, next) => {
    let profile = req.user;

    try {
        let user = await User.findOne({auth0_id: profile.sub});

        if (!user) {
            profile = await auth.getUser({id: profile.sub});

            user = await new User({
                auth0_id: profile.user_id,
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
        console.error(err);
        next(err);
    }
};