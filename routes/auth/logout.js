var app = require('express')();

app.get("/auth/logout", (req, res) => {
    req.logout();
    delete req.session;
    res.redirect("/");
});

module.exports = app;