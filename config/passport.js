require("dotenv").config();
const app = require('express')();
var passport = require('passport');
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../model/user");

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "/auth/google/redirect",
        },
        (accessToken, refreshToken, profile, done) => {
            User.findOrCreate(
                {
                    googleId: profile.id,
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    photo: profile.photos[0].value,
                },
                (err, user) => {
                    return done(err, user);
                }
            );
        }
    )
);


passport.serializeUser((user, done) => {
    //console.log('serialize');
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    //console.log('deserialize');
    User.findById(id)
        .then((user) => {
            done(null, user);
        })
        .catch((err) => {
            console.log(err);
        });
});