//const LocalStrategy = require('passport-local').Strategy
import passport from "passport";
import LocalStrategy from "passport-local";
import userModel from './Models/User.js';

// Hardcode user for now
//const USER = { id: 123, username: 'user', password: 'password', secret: 'info30005' }

// Serialize information to be stored in session/cookie
passport.serializeUser((user, done) => {
    // Use id to serialize user
    done(undefined, user._id)
})

// When a request comes in, deserialize/expand the serialized information
// back to what it was (expand from id to full user)
passport.deserializeUser((userId, done) => {
    userModel.findById(userId,(err,user) => {
        if (err) {
            return done(err, undefined)
        }
        return done(undefined, user)
    })
})

// Define local authentication strategy for Passport
// http://www.passportjs.org/docs/downloads/html/#strategies
passport.use(
    new LocalStrategy((username, password, done) => {
        userModel.findOne({username: username}, {}, {}, (err, user) => {
            if (err) { return done(null, false, { message: 'Unknown error.' }) }
            if (!user) { return done(null, false, { message: 'Incorrect username.' }) }
        // if there is a user with this username, check if the password matches
        user.verifyPassword(password, (err, valid) => {
          if (err) {  return done(null, false, { message: 'Unknown error.' }) }
          if (!valid) { return done(null, false, { message: 'Incorrect password.' }) }
          return done(null, user)
        })
    })
})
)

export default passport;