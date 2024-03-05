const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
	const transporter = nodemailer.createTransport({
		service: "gmail",
		host: "smtp.gmail.com",
		port: 587,
		secure: false,
		auth: {
			user: process.env.USER,
			pass: process.env.APP_PASSWORD,
		},
	});

	const message = {
		from: `vTodo <${process.env.USER}>`,
		to: options.email,
		subject: options.subject,
		html: `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <style>      
                a {
                    text-decoration: none;
                    transition: all ease-in-out 0.3s;
                }
                a:hover {
                    opacity: 0.8;
                    text-decoration: underline;
                }
            </style>
        </head>
        <body style="body{text-align:center; font-family: monospace;}">
            <h1>vTodo - Reset Password</h1>
            <p>Click the link below to reset your password</p>
            <a style="color: #6466f8;" href="${options.resetUrl}">${options.resetUrl}</a>
        </body>
        </html>`,
	};

	const info = await transporter.sendMail(message);

	console.log("Message sent: %s", info.messageId);
};

module.exports = sendEmail;
