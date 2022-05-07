//const LocalStrategy = require('passport-local').Strategy
import passport from "passport";
import LocalStrategy from "passport-local";

// Hardcode user for now
const USER = { id: 123, username: 'user', password: 'password', secret: 'info30005' }

// Serialize information to be stored in session/cookie
passport.serializeUser((user, done) => {
    // Use id to serialize user
    done(undefined, user.id)
})

// When a request comes in, deserialize/expand the serialized information
// back to what it was (expand from id to full user)
passport.deserializeUser((userId, done) => {
    // Run database query here to retrieve user information
    // For now, just return the hardcoded user
    if (userId === USER.id) {
        done(undefined, USER)
    } else {
        done(new Error('Bad User'), undefined)
    }
})

// Define local authentication strategy for Passport
// http://www.passportjs.org/docs/downloads/html/#strategies
passport.use(
    new LocalStrategy((username, password, done) => {
        // Check if user exists and password matches the hash in the database
        // For now, just match the hardcoded user
        if (username !== USER.username || password !== USER.password) {
            return done(undefined, false, {
                message: 'Incorrect username/password',
            })
        }
        // If credentials match, return user in callback
        return done(undefined, USER)
    })
)
//module.exports = passport

export default passport;