var app = require("express")();
var cors = require("cors");
const Movie = require("../model/movie");

var corsOptions = {
    origin: "https://cdn.dash-streaming.xyz",
    methods: "GET, HEAD, OPTIONS",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.get("/player/:movie", cors(corsOptions), (req, res) => {
    if (req.isAuthenticated()) {
        const requestSegments = req.path.split("/");
        const request = requestSegments[requestSegments.length - 1];

        Movie.findById(request)
            .lean()
            .exec((err, movie) => {
                if (err) {
                    console.log(err);
                    res.status(404).sendFile(
                        path.join(__dirname, "..", "views", "404.html")
                    );
                } else {
                    res.render("player", { movie: movie });
                }
            });
    } else {
        res.redirect("/auth/google");
    }
});

module.exports = app;
