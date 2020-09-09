var app = require("express")();
const path = require("path");

app.get("*", (req, res) => {
    res.set("Cache-Control", "public, max-age=172800, s-maxage=172800");
    //res.set('Cache-Control', 'public, max-age=0, s-maxage=0');
    res.status(404).sendFile(
        path.join(__dirname, "..", "public", "html", "404.html")
    );
});

module.exports = app;
