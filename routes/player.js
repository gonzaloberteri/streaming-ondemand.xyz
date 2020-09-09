var app = require("express")();

app.get("/player", (req, res) => {
    if (req.isAuthenticated()) {
        res.render("player");
    } else {
        res.redirect("/");
    }
});

module.exports = app;
