const User = require('../models/User');

exports.register = async(req,res,next) => {
    res.status(201).json({success: true});
};