// https://www.npmjs.com/package/jwt-simple
const jwt = require('jwt-simple');
const config = require('../config');

const User = require('./../models/user');

function tokenForUser(user) {
    const timestamp = new Date().getTime();
    // iat - issued at time
    return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signUp = function (req, res, next) {
    const email = req.body.email;
    const password = req.body.password;

    if (!email) {
        return res.status(422).send({error: 'email required'});
    } else if (!password) {
        return res.status(422).send({error: 'password required'});
    }

    User.findOne({email}, function (err, existingUser) {
        if (err) {
            return next(err);
        }
        if (existingUser) {
            return res.status(422).send({error: 'email is in use'});
        }
        const user = new User({
            email,
            password
        });
        user.save(function (err) {
            if (err) {
                return next(err);
            }
            // res.json(user);
            res.json({success: true, token: tokenForUser(user)});
        });
    });
}

exports.signIn = function (req, res, next) {
    res.send({success: true, token: tokenForUser(req.user)});
}