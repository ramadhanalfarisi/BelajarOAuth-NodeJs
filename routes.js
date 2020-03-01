const OauthController = require('./controller/OauthController')
const OauthFacebookController = require('./controller/OauthFacebookController')
const passport = require('passport')

module.exports = (app) => {
    app.get('/google',passport.authenticate("google",{scope:['profile']}))
    app.get('/google/redirect',passport.authenticate('google'),OauthController.redirect)
    app.get('/facebook',passport.authenticate('facebook', { scope: ['user_friends', 'manage_pages'] }))
    app.get('/facebook/redirect',passport.authenticate('facebook'),OauthFacebookController.redirect)
}