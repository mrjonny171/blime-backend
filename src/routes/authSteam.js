import express from 'express';
import passport from '../services/passport-steam';
import isAuthenticated from "../middleware/authenticate"


const steamRouter = express.Router()

steamRouter.get('/api/auth/steam', passport.authenticate('steam', { failureRedirect: '/' }), function (req, res) {
    res.redirect('/')
});

steamRouter.get('/api/auth/steam/return', passport.authenticate('steam', { failureRedirect: '/' }), function (req, res) {
    res.redirect('http://localhost:5173/dashboard/trending')
});


export default steamRouter
