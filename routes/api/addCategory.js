const app = require('express')();
var cors = require('cors')
const Category = require("../../model/category");

var corsOptions = {
    origin: 'https://dash-streaming.xyz',
    methods: 'POST',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.post("/add-category", cors(corsOptions), (req, res) => {
    const categoryText = req.body.category_text;
    const categoryId = req.body.category_id;
    
    if (
        categoryText &&
        categoryText.length < 50 &&
        categoryId &&
        categoryId.length < 20
    ) {
        new Category({
            id: categoryId,
            text: categoryText,
        }).save(() => {
            res.redirect("/admin");
        });
    } else {
        res.send("err: bad parameters");
    }
});

module.exports = app;
