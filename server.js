const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    router = require('./routes'),
    port = 3000,
    cookie = require('cookie-session'),
    passport = require('passport')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(express.static('public'))
app.use(bodyParser.text())
app.use(express.json())
app.use(cookie({
    maxAge: 24 * 60 * 60 * 1000,
    keys: "belajaroauth"
}))
app.use(passport.initialize())
app.use(passport.session())

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

router(app)

app.listen(port, () => {
    console.log('server has running in port ' + port)
})