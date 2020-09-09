module.exports = function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://cdn.dash-streaming.xyz"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Request-Method", "GET, HEAD, OPTIONS");
    next();
}