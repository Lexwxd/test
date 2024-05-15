

export const asyncHandler = fn => (req, res, next) => {
    return Promise
        .resolve(fn(req, res, next))
        .catch(next);
};

export const requireToken = (req, res, next)=>{
    const token = req.header('x-access-token')
    if(!token || token !== 'tetssecretphraze'){
        res.status(403).send()
        return
    }
    next()
}