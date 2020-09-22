const passport = require("passport");
const MockStrategy = require("passport-mock-strategy");
const app = require("../app");

module.exports = function mockLogin() {
    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(
        new MockStrategy(
            {
                name: "login-mock",
                user: { name: "testing-user", isEditor: true },
            },
            (user, done) => {
                return done(null, user);
            }
        )
    );

    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        done(null, user);
    });

    app.get("/auth/mock", passport.authenticate("login-mock",{successRedirect: '/',failureRedirect: '/login'}), (req, res) => {
        console.log(req.isAuthenticated(), req.user);
    });
};
