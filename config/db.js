const mongoose = require("mongoose");

const isProd = process.env.NODE_ENV === "production";

mongoose.connect(isProd ? process.env.MONGO_URI : "mongodb://localhost/netflixClone", {
    dbName: "netflixClone",
    useNewUrlParser: true,
    useUnifiedTopology: true,
});