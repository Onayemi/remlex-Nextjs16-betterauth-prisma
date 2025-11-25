import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: Number(process.env.EMAIL_SERVER_PORT),
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});

export async function sendEmail({ to, subject, text}: {
    to: string;
    subject: string;
    text: string;
}) {
    await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to, 
        subject,
        htnl: `
            <p>You requested a password reset.</p>
            <p>${text}</p>
            <p>If you did not request this, please ignore this email.</p>
        `
    });
}