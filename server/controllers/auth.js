const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const sendEmail = require('../utils/sendEmail');

exports.register = async(req,res,next) => {
    try {
        const { username, email, password } = req.body;

        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ success: false, message: 'Username already in use' });
        }

        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ success: false, message: 'Email already in use' });
        }

        const user = await User.create({
            username,
            email,
            password
        });

        sendTokenResponse(user, 200, res)
    } catch (error) {
        res.status(400).json({success: false, message: error});
    }
};

exports.login = async(req,res,next) => {
    try {
        const { username, password } = req.body;

        if(!username || !password){
            return res.status(401).json({success: false, message: "Please provide a username and password"});
        }

        const user = await User.findOne({ username }).select("+password");

        if(!user) {
            return res.status(401).json({success: false, message: "Invalid credentials"});
        }

        const isMatch = await user.matchPassword(password);

        if(!isMatch){
            return res.status(401).json({success: false, message: "Invalid credentials"});
        }

        sendTokenResponse(user, 200, res)
    } 
    catch (error) {
        res.status(400).json({success: false, message: error});
    }
};

exports.getMe = async (req,res,next) => {
    const user = await User.findById(req.user.id);
    
    res.status(200).json({success: true, data:user});
};

exports.resetPassword = async(req,res,next) => {
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.resetToken).digest('hex');

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpiration: { $gt: Date.now() }
    });

    if(!user){
        return next(new ErrorResponse('Invalid token', 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiration = undefined;
    await user.save();

    sendTokenResponse(user, 200, res);

}

const sendTokenResponse = (user, statusCode, res) => {
    const token = user.getSignedJwtToken();

    const options = {
        httpOnly: true
    };

    res.status(statusCode).cookie('token', token, options).json({ success: true, token}); 
};

exports.forgotPassword = async(req,res,next) => {
    const user = await User.findOne({ email: req.body.email });
    if(!user){
        return next(new ErrorResponse('There is no user with that email', 404));
    }

    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    const resetUrl = `${req.protocol}://${req.get('host')}/api/auth/resetpassword/${resetToken}`;

    const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;

    try {
        await sendEmail({
            email: user.email,
            subject: 'Password reset token',
            message
        });

        res.status(200).json({success: true, data:'Email sent'});
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiration = undefined;

        await user.save({ validateBeforeSave: false });

        return next(new ErrorResponse('Email could not be sent', 500));
    }
};