const mongoose = require("mongoose");

function dbConnect(uri){
    mongoose.connect(uri, {
        dbName: "netflixClone",
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}

switch(process.env.NODE_ENV){
    case "production":
        dbConnect(process.env.MONGO_URI);
        break;
    
    case "development":
        dbConnect("mongodb://localhost/netflixClone");
        break;
    
    case "development":
        dbConnect("mongodb://localhost/netflixClone-testing");
        break;
}
