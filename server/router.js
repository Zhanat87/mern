const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuthMiddleware = passport.authenticate('jwt', {session: false});
const requireSignInMiddleware = passport.authenticate('local', {session: false});

module.exports = function (app) {
    app.get('/', function (req, res, next) {
        res.send({ message: 'Super secret code is ABC123' });
    });

    app.get('/restricted', requireAuthMiddleware, function (req, res, next) {
        res.send({hi: 'there'});
    });

    app.post('/sign-in', requireSignInMiddleware, Authentication.signIn);

    app.post('/sign-up', Authentication.signUp);
};