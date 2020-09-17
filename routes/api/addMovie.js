const app = require("express")();
var cors = require("cors");
const Token = require("../../model/token");
const Movie = require("../../model/movie");
const Category = require("../../model/category");

var corsOptions = {
    origin: "https://streaming-ondemand.xyz",
    methods: "POST",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.post("/add-movie", cors(corsOptions), function (req, res) {
    const title = req.body.title;
    const category = req.body.category;
    const thumbnail = req.body.thumbnail;
    const fileName = req.body.fileName;
    if (
        title &&
        title.length <= 40 &&
        category &&
        category.length <= 20 &&
        thumbnail &&
        fileName
    ) {
        //send token key to dashy
        let tomorrow = new Date(Date.now() + 3600 * 1000 * 24);

        const token = new Token({
            user: req.user._id,
            expires: tomorrow,
            file: req.body.fileName,
            used: false,
        });
        token.save(() => {
            Category.findOne({text: req.body.category}, (err, category) => {
                new Movie({
                    title: req.body.title,
                    category: category._id,
                    visible: false,
                    uploadToken: token._id}
                ).save(() => {
                    res.status(200).json({ token: token._id });
                });
            });
        });
    }else{
        res.status(400).json({status: 
            title &&
            title.length <= 40 &&
            category &&
            category.length <= 20 &&
            thumbnail &&
            fileName});
    }
});

module.exports = app;
