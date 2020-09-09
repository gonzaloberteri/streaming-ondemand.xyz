const app = require('express')();
const Token = require("../../model/token");

app.post("/add-movie", function (req, res) {
    //check if fields are valid
    //console.log(req.body);

    //send token key to dashy
    let tomorrow = new Date(Date.now() + 3600 * 1000 * 24);

    const token = new Token({
        user: req.user._id,
        expires: tomorrow,
        file: req.body.fileName,
    });
    token.save(() => {
        res.status(200).json({ token: token._id });
    });
});