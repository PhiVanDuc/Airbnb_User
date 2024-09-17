import nodemailer from "nodemailer";

const email = process.env.EMAIL;
const pass = process.env.EMAIL_PASSWORD;

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: email,
        pass,
    }
});

const mail = async (to, subject, message) => {
    return await transporter.sendMail({
        from: email,
        to,
        subject,
        html: message,
    });
}

export default mail;