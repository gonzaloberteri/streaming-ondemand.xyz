var app = require("express")();
var passport = require("passport");
const cloudFront = require("../../config/aws");

app.get(
    "/auth/google",
    passport.authenticate("google", {
        scope: ["profile", "email"],
    })
);

app.get(
    "/auth/google/redirect",
    passport.authenticate("google", { failureRedirect: "/auth/google" }),
    (req, res) => {
        const policy = JSON.stringify({
            Statement: [
                {
                    Resource: "http*://cdn.streaming-ondemand.xyz/*", // http* => http and https
                    Condition: {
                        DateLessThan: {
                            "AWS:EpochTime": Math.floor(
                                req.user.expires.getTime() / 1000
                            ), // Current Time in UTC + time in seconds, (60 * 60 * 1 = 1 hour)
                        },
                    },
                },
            ],
        });

        const cookie = cloudFront.getSignedCookie({
            policy: policy,
        });

        res.cookie("CloudFront-Key-Pair-Id", cookie["CloudFront-Key-Pair-Id"], {
            domain: ".streaming-ondemand.xyz",
            path: "/",
            httpOnly: true,
        });

        res.cookie("CloudFront-Policy", cookie["CloudFront-Policy"], {
            domain: ".streaming-ondemand.xyz",
            path: "/",
            httpOnly: true,
        });

        res.cookie("CloudFront-Signature", cookie["CloudFront-Signature"], {
            domain: ".streaming-ondemand.xyz",
            path: "/",
            httpOnly: true,
        });
        res.redirect("/");
    }
);

module.exports = app;
