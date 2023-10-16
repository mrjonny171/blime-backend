import passport from 'passport';
import passportSteam from 'passport-steam';
import config from "./config"

var SteamStrategy = passportSteam.Strategy;
var port = 5000

passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});

passport.use(new SteamStrategy({
    returnURL: 'http://localhost:' + port + '/api/auth/steam/return',
    realm: 'http://localhost:' + port + '/',
    apiKey: config.steam.API_Key
}, function (identifier, profile, done) {
    process.nextTick(function () {
        profile.identifier = identifier;
        return done(null, profile);
    });
}
));

export default passport