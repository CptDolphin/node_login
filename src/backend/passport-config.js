const local_strategy = require('passport-local').Strategy
const bcrypt = require('bcrypt');

function init() {
    const authenticate_user = (email, passport, done) => {
        const user = getUserByEmail(email);
        if (user == null) {
            return done(null, false, {message: 'No user with that email'});
        }

        try {
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user);
            } else {
                return done(null, false, {message: 'Password incorrect'});
            }
        } catch(e) {
            return done(e);
        }
    };

    passport.use(new LocalStrategy({ username_field: 'email'}), authenticate_user); 
    passport.serializeUser((user, done) => {});
    passport.deserializeUser((id, done) => {});
}

module.export = init
