const app = require("express")();
var cors = require("cors");
const Category = require("../../model/category");

var corsOptions = {
    origin: "https://streaming-ondemand.xyz",
    methods: "POST",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.post("/add-category", cors(corsOptions), (req, res) => {
    const categoryText = req.body.category_text;

    if (categoryText && categoryText.length < 50) {
        new Category({
            text: categoryText,
        }).save(() => {
            res.redirect("/admin");
        });
    } else {
        res.send("err: bad parameters");
    }
});

module.exports = app;
