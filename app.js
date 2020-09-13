require("dotenv").config();
// Include the cluster module
var cluster = require("cluster");

// Code to run if we're in the master process
if (cluster.isMaster && process.env.NODE_ENV === "production") {
    // Count the machine's CPUs
    var cpuCount = require("os").cpus().length;

    // Create a worker for each CPU
    for (var i = 0; i < cpuCount; i += 1) {
        cluster.fork();
    }

    // Listen for terminating workers
    cluster.on("exit", function (worker) {
        // Replace the terminated workers
        console.log("Worker " + worker.id + " died :(");
        cluster.fork();
    });

    // Code to run if we're in a worker process
} else {
    const express = require("express");
    var passport = require("passport");
    const bodyParser = require("body-parser");

    const app = express();

    app.engine("hbs", require("consolidate").handlebars);
    app.set("views", require("path").join(__dirname, "views"));
    app.set("view engine", "hbs");
    app.use(express.static("public"));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(require("./config/cookieSession"));
    app.use(passport.initialize());
    app.use(passport.session());
    //app.use(require("./config/cors"));

    require("./config/aws");
    require("./config/passport");
    require("./config/db");
    require("./config/cookieSession");
    
    app.use(require("./routes/index"));
    app.use(require("./routes/player"));
    app.use(require("./routes/admin"));
    app.use(require("./routes/api/addCategory"));
    app.use(require("./routes/api/addMovie"));
    app.use(require("./routes/auth/google"));
    app.use(require("./routes/auth/logout"));
    app.use(require("./routes/404"));

    var port = process.env.PORT || 5000;

    var server = app.listen(port, function () {
        console.log("Server running at http://127.0.0.1:" + port + "/");
    });
}