var app = require('express')();
const path = require("path");
const Movie = require("../model/movie");

app.get("/", (req, res) => {
    if (req.isAuthenticated()) {
        let categories = [];
        Movie.find({visible: true}).lean().exec((err, movies) => {
            if (!err) {
                movies.forEach((movie) => {
                    const found = categories.find((element) => {
                        return element.text === movie.category;
                    });

                    if (found) {
                        categories[categories.indexOf(found)].movies.push(
                            movie
                        );
                    } else {
                        categories.push({
                            text: movie.category,
                            movies: [movie],
                        });
                    }
                });

                res.render("index", {
                    categories,
                    user: req.user.toObject(),
                });
            } else {
                res.send(err);
            }
        });
    } else {
        res.sendFile(
            path.join(__dirname, "..","views", "landing.html")
        );
    }
});

module.exports = app;