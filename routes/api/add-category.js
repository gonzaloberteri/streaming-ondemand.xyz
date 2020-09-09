const app = require('express')();
const Category = require("../../model/category");

app.post("/add-category", (req, res) => {
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
