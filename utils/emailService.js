import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_PASSWORD,
    },
});

/**
 * Sending login credentials to a new tenant
 * 
 * @param {string} to -- Tenant email
 * @param {string} password -- Tenant generated password
 * @param {string} name -- Tenant name
 */

export const sendTenantCredentials = async (to, password, name) => {
    const mailOptions = {
        from: process.env.ADMIN_EMAIL,
        to,
        subject: 'Your credentials',
        html: `
          <p>Dear ${name},</p>
      <p>You have been successfully registered as a tenant. Below are your login credentials:</p>
      <ul>
        <li><strong>Email:</strong> ${to}</li>
        <li><strong>Password:</strong> ${password}</li>
      </ul>
      <p>Please log in and change your password after your first login.</p>
      <p>Regards,<br/>Apartment Management</p>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully to ${to}');
    } catch (error) {
        console.error('Error sending email:', error);
    }
}