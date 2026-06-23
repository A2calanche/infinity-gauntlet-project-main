import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export const sendPasswordResetEmail = async (toEmail, resetToken) => {
  const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

  await transporter.sendMail({
    from: `"Infinity Gauntlet" <${process.env.GMAIL_USER}>`,
    to: toEmail,
    subject: "Password Reset Request",
    text: `You requested a password reset.\n\nClick the link below to reset your password. It expires in 10 minutes.\n\n${resetUrl}\n\nIf you didn't request this, ignore this email.`,
  });
};