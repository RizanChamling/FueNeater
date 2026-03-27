const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_PORT == 465, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const emailService = {
  sendOrderConfirmation: async (userEmail, orderDetails) => {
    try {
      const { orderId, total_amount, items } = orderDetails;
      
      const itemsHtml = items.map(item => `
        <li>
          <strong>${item.product_name || 'Product'}</strong> (x${item.quantity}) - $${item.subtotal}
          <br/>
          <small>
            ${item.selected_material ? `Material: ${item.selected_material}` : ''}
            ${item.selected_color ? `, Color: ${item.selected_color}` : ''}
            ${item.custom_dimensions ? `, Dimensions: ${item.custom_dimensions}` : ''}
          </small>
        </li>
      `).join('');

      const mailOptions = {
        from: `"FurNeater" <${process.env.EMAIL_FROM || process.env.EMAIL_USER}>`,
        to: userEmail,
        subject: `Order Confirmation - #${orderId}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <h2 style="color: #333; text-align: center;">Thank you for your order!</h2>
            <p>Hi there,</p>
            <p>Your order <strong>#${orderId}</strong> has been successfully placed. We're getting it ready for you!</p>
            
            <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <h3 style="margin-top: 0;">Order Summary</h3>
              <ul style="list-style: none; padding: 0;">
                ${itemsHtml}
              </ul>
              <hr style="border: 0; border-top: 1px solid #ddd; margin: 15px 0;">
              <p style="font-size: 18px; font-weight: bold;">Total: $${total_amount}</p>
            </div>
            
            <p>If you have any questions, feel free to contact us.</p>
            <p>Best regards,<br/>The FurNeater Team</p>
          </div>
        `,
      };

      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent: %s', info.messageId);
      return info;
    } catch (error) {
      console.error('Error sending email:', error);
      // We don't want to throw error and break the checkout flow if email fails
      return null;
    }
  }
};

module.exports = emailService;
