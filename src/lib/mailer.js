import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  service: 'gmail', // You can change this to any SMTP service
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendStatusEmail = async (toEmail, name, status) => {
  const isApproved = status === 'Approved';
  
  const subject = isApproved 
    ? '🎉 Welcome to NayePankh Foundation - Application Approved!'
    : 'Update on your NayePankh Foundation Application';
    
  const text = isApproved
    ? `Dear ${name},\n\nCongratulations! Your application to volunteer at NayePankh Foundation has been approved.\n\nWe are thrilled to welcome you to our team. Someone from our coordination team will reach out to you shortly with next steps.\n\n"Badalte Bharat Ki Nayi Tasveer"\n\nBest Regards,\nNayePankh Foundation`
    : `Dear ${name},\n\nThank you for your interest in volunteering with NayePankh Foundation. \n\nAfter reviewing your application, we regret to inform you that we cannot proceed with your registration at this time.\n\nWe appreciate your desire to help the society and wish you the best in your future endeavors.\n\nBest Regards,\nNayePankh Foundation`;

  const html = isApproved
    ? `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
        <h2>🎉 Welcome to NayePankh Foundation!</h2>
        <p>Dear ${name},</p>
        <p>Congratulations! Your application to volunteer at NayePankh Foundation has been <strong>approved</strong>.</p>
        <p>We are thrilled to welcome you to our team. Someone from our coordination team will reach out to you shortly with next steps.</p>
        <blockquote style="border-left: 4px solid #e63946; padding-left: 10px; color: #666; font-style: italic;">
          "If we all do something, then together there is no problem that we cannot solve!"<br>
          - Badalte Bharat Ki Nayi Tasveer
        </blockquote>
        <p>Best Regards,<br><strong>NayePankh Foundation</strong></p>
      </div>
    `
    : `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
        <h2>Application Update</h2>
        <p>Dear ${name},</p>
        <p>Thank you for your interest in volunteering with NayePankh Foundation.</p>
        <p>After reviewing your application, we regret to inform you that we cannot proceed with your registration at this time.</p>
        <p>We appreciate your desire to help the society and wish you the best in your future endeavors.</p>
        <p>Best Regards,<br><strong>NayePankh Foundation</strong></p>
      </div>
    `;

  try {
    await transporter.sendMail({
      from: `"NayePankh Foundation" <${process.env.EMAIL_USER}>`,
      to: toEmail,
      subject,
      text,
      html,
    });
    console.log(`Email sent successfully to ${toEmail}`);
    return true;
  } catch (error) {
    console.error(`Failed to send email to ${toEmail}:`, error);
    return false;
  }
};
