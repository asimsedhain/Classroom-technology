const passport = require("passport");
const localStrategy = require('passport-local').Strategy;
const user = require("./models/users");

exports.models = passport.use(new localStrategy(user.authenticate()));

passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());