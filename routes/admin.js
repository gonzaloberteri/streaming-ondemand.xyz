var app = require("express")();
const Category = require("../model/category");
const Movie = require("../model/movie");

app.get("/admin", (req, res) => {
    if (req.isAuthenticated() && req.user.email === "gonzaloberteri@gmail.com") {
        Category.find()
            .lean()
            .exec((err, categories) => {
                if (!err) {
                    Movie.find({ visible: true })
                        .lean()
                        .exec((err, movies) => {
                            if (!err) {
                                movies.forEach((movie) => {
                                    let category = categories.find(
                                        (category) => {
                                            return (
                                                category.text === movie.category
                                            );
                                        }
                                    );

                                    const index = categories.indexOf(category);

                                    if (
                                        category &&
                                        category.hasOwnProperty("movies")
                                    ) {
                                        categories[index].movie.push(movie);
                                    } else {
                                        categories[index] = {
                                            ...category,
                                            movies: [movie],
                                        };
                                    }
                                });

                                res.render("admin", {
                                    categories,
                                    user: req.user.toObject(),
                                });
                                
                            } else {
                                res.send(err);
                            }
                        });
                } else {
                    res.send(err);
                }
            });
    } else {
        res.redirect("/auth/google");
    }
});

module.exports = app;
