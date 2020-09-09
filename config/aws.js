var AWS = require("aws-sdk");

AWS.config.region = "sa-east-1";

const cloudFront = new AWS.CloudFront.Signer(
    process.env.KEY_ID,
    process.env.PRIVATE_KEY
);

module.exports = cloudFront