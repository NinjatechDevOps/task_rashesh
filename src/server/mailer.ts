import nodemailer from 'nodemailer';

// Create a transporter for nodemailer
export const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: '',
        pass: ''
    }
});

// mailtrap@demomailtrap.com