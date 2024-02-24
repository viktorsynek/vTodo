const User = require('../models/User');

exports.register = async(req,res,next) => {
    const { username, email, password } = req.body;

    const user = await User.create({
        username,
        email,
        password
    })

    res.status(201).json({ success: true });
};