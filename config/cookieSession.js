module.exports = require("cookie-session")({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_SESSION_SECRET],
});
