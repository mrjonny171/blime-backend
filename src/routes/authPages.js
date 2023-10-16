import express from 'express';
import isAuthenticated from "../middleware/authenticate"

const authRouter = express.Router()

authRouter.get("/steam/displayName", isAuthenticated, (req, res) => {
    console.log("Name:" + req.isAuthenticated())
    res.status(200).send(req.user.displayName)
})

authRouter.get("/steam/picture", isAuthenticated, (req, res) => {
    console.log("Picture:" + req.isAuthenticated())
    res.status(200).send(req.user.photos[0].value)
})

authRouter.get("/steam/id", isAuthenticated, (req, res) => {
    console.log("ID:" + req.user.id)
    const steamid =
        { firstID : req.user.id.substring(0,10), secondID : req.user.id.substring(10) }
    res.status(200).send(steamid)
})

authRouter.get("/steam/alive", (req, res) => {
    res.json(req.isAuthenticated())
});

authRouter.get("/steam/logout", isAuthenticated, (req, res) => {
    req.logout(req.user, function (err) {
        if (err) {
            return res.json(err)
        }
        res.sendStatus(200)
    });
});

export default authRouter