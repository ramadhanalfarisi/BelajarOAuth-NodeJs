const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')
const User = require('../models').user
const opts = {}
require('dotenv').config()

opts.clientID = process.env.CLIENT_ID
opts.clientSecret = process.env.CLIENT_SECRET
opts.callbackURL = process.env.CALLBACK_URL

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    let data = await User.findOne({
        where: {
            id: id
        }
    })
    if (data) {
        done(null, data)
    }
})

passport.use(new GoogleStrategy(opts, async (accessToken, refreshToken, profile, done) => {
    console.log(profile)
    let caridata = await User.findOne({
        where: {
            googleid: profile.id
        }
    })
    if (caridata) {
        console.log("user has added on database")
        done(null, caridata)
    } else {
        let data = await User.create({
            googleid: profile.id,
            name: profile.displayName
        })
        if (data) {
            console.log("create user successfully")
            done(null, data)
        }
    }

}))

exports.redirect = (req, res) => {
    if (!req.user) {
        res.send("failed")
    } else {
        res.status(200).json({
            status: 'success',
            code: 200
        })
    }
}
