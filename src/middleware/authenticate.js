function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    console.log("not authenticated")
    res.status(401);

}

export default isAuthenticated