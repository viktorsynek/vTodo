const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');

exports.register = async(req,res,next) => {
    try {
        const { username, email, password } = req.body;

        const user = await User.create({
            username,
            email,
            password
        });

        const token = user.getSignedJwtToken();
    
        res.status(201).json({ success: true, token: token });
    } catch (error) {
        res.status(400).json({success: false, message: error});
    }
};

exports.login = async(req,res,next) => {
    try {
        const { username, password } = req.body;

        if(!username || !password){
            return next(new ErrorResponse('Please provide an email and password', 400));
        }

        const user = await User.findOne({ username }).select("+password");

        if(!user) {
            return next(new ErrorResponse('Invalid credentials', 401));
        }

        const isMatch = await user.matchPassword(password);

        if(!isMatch){
            return next(new ErrorResponse('Invalid credentials', 401));
        }

        const token = user.getSignedJwtToken();
    
        res.status(201).json({ success: true, token });
    } catch (error) {
        res.status(400).json({success: false, message: error});
    }
}