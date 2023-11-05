const User = require("../models/User");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;

const localStrategy = new LocalStrategy(async (username, password, done) => {
  const user = await User.findOne({ username: username });
  if (!user) return done({ Message: "Username Or password is Wrong" });
  const passwordsMatch = await bcrypt.compare(password, user.password);
  if (!passwordsMatch)
    return done({ Message: "Username Or password is Wrong" });
  return done(null, user);
});

module.exports = localStrategy;
