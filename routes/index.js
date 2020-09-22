var app = require("express")();
const path = require("path");
const Movie = require("../model/movie");
const Category = require("../model/category");

app.get("/", async (req, res) => {
    if (req.isAuthenticated()) {

        let categories = [];
        let movies = [];

        if (req.user.isEditor) {
            categories = await Category.find().lean();
        }

        movies = await Movie.find({ visible: true }).lean();

        movies.forEach(async (movie, index) => {
            const category = await Category.findById(movie.category);

            let found = categories.find((element) => {
                return element.text === category.text;
            });


            if (found) {
                const index = categories.indexOf(found);
                if (categories[index].movies === undefined) categories[index].movies = [];
                categories[index].movies.push(movie);
            } else {
                categories.push({
                    text: category.text,
                    movies: [movie]
                });
            }

            if (index === movies.length - 1) {
                res.render(req.user.isEditor ? "admin" : "index", {
                    categories,
                    user: req.user.toObject(),
                });
            }
        });
    } else {
        res.sendFile(path.join(__dirname, "..", "views", "landing.html"));
    }
});

module.exports = app;
