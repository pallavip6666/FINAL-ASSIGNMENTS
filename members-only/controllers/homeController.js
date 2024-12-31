// GET / -> homepage
function homeGet(req, res) {
    if (req.isAuthenticated()) {
        res.redirect("/messages");
    } else {
        res.redirect("/log-in");
    }
}

const homeController = {
    homeGet,
}

export default homeController;