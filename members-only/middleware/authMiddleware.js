export function isAuth(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        const error = new Error("You are not authorized to view this resource.");
        error.status = 401;
        return next(error);
        //res.status(401).json({ message: "You are not authorized to view this resource." });
    }
}

export function setLocalsUser (req, res, next) {
    if (req.isAuthenticated()) {
        res.locals.user = req.user;
    } 
    next();
}

export function isAdmin(req, res, next) {
    if (!req.user.admin) {
        const error = new Error("You are not the admin, therefore you cannot delete messages.");
        error.status = 401;
        return next(error);
    }
    next();
}