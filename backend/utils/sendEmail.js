import nodemailer from "nodemailer";

const sendEmail = async (options) => {
    const transporter = nodemailer.createTransport({
        service: "gmail", // Gmail service
        auth: {
            user: process.env.EMAIL_USER, // Your Gmail email
            pass: process.env.EMAIL_PASS, // Use an App Password here (not your Gmail password)
        },
    });

    const message = {
        from: process.env.EMAIL_USER,
        to: options.email,
        subject: options.subject,
        text: options.message,
    };

    try {
        await transporter.sendMail(message);
    } catch (error) {
        console.log("Email error:", error);
        throw new Error("Error sending email");
    }
};

export default sendEmail;
