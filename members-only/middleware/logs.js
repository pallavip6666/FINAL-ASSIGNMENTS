export function loggs(req, res, next) {
    console.log(req.session);
    console.log(req.user); 
    next();
}