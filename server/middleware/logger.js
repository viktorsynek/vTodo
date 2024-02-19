const logger = (req,res,next) => {
    console.log(`${req.method} on ${req.protocol}://${req.get('host')}${req.originalUrl}`.yellow);
    next();
}

module.exports = logger;