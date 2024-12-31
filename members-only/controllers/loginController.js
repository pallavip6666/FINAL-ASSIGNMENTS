import db from "../db/queries.js";
import passport from "passport";
import LocalStrategy from "passport-local";
import bcrypt from "bcryptjs";

// passport configuration (strategy) -> LocalStrategy setup
passport.use(new LocalStrategy(async (username, password, done) => {
    try {
        // find username which is trying to log in
        const result = await db.findUsername(username);
        const user = result[0];
        if (!user) return done(null, false, { message: "Incorrect username!" });

        // password comparison -> plain to hashed
        const match = await bcrypt.compare(password, user.password);
        if (!match) return done(null, false, { message: "Incorrect password!" });

        return done(null, user);
    } catch (error) {
        return done(error);
    }
}));

// session and serialization, session creation
// user available through req.user
passport.serializeUser(async (user, done) => {
    done(null, user.id);
});

// retrieving ID from stored session
passport.deserializeUser(async (id, done) => {
    try {
        const result = await db.findUserById(id);
        const user = result[0];
        done(null, user); // user available in req.user
    } catch (error) {
        done(error);
    } 
})

// GET /log-in -> display form
function loginGet(req, res) {
    res.render("log-in");
}

export default {
    loginGet,
    //loginPost,
};