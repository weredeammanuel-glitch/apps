/// <reference path="../pb_data/types.d.ts" />
onRecordAfterCreateSuccess((e) => {
  const email = e.record.get("email");
  const otp = e.record.get("otp");
  
  const message = new MailerMessage({
    from: {
      address: $app.settings().meta.senderAddress,
      name: "Z00MEX Security"
    },
    to: [{ address: email }],
    subject: "Password Recovery - Your OTP Code",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .header h1 { margin: 0; font-size: 28px; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
          .otp-box { background: white; border: 2px solid #667eea; padding: 20px; text-align: center; margin: 20px 0; border-radius: 6px; }
          .otp-code { font-size: 36px; font-weight: bold; color: #667eea; letter-spacing: 4px; font-family: 'Courier New', monospace; }
          .info-box { background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; border-radius: 4px; }
          .info-box strong { color: #856404; }
          .instructions { background: white; padding: 15px; margin: 20px 0; border-radius: 4px; border: 1px solid #ddd; }
          .instructions ol { margin: 10px 0; padding-left: 20px; }
          .instructions li { margin: 8px 0; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
          .brand { color: #667eea; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🔐 Password Recovery</h1>
            <p>Secure your Z00MEX account</p>
          </div>
          
          <div class="content">
            <p>Hello,</p>
            
            <p>We received a request to reset your password. Use the OTP code below to proceed with your password recovery:</p>
            
            <div class="otp-box">
              <p style="margin: 0 0 10px 0; color: #666; font-size: 14px;">Your OTP Code</p>
              <div class="otp-code">${otp}</div>
            </div>
            
            <div class="info-box">
              <strong>⏱️ Expiration Notice:</strong> This OTP code is valid for 15 minutes only. After that, you'll need to request a new code.
            </div>
            
            <div class="instructions">
              <strong>How to use your OTP:</strong>
              <ol>
                <li>Go to the password recovery page on Z00MEX</li>
                <li>Enter your email address: <strong>${email}</strong></li>
                <li>Paste the OTP code above in the verification field</li>
                <li>Create your new password and confirm</li>
                <li>You'll be logged in with your new password</li>
              </ol>
            </div>
            
            <div class="info-box" style="background: #f0f7ff; border-left-color: #0066cc;">
              <strong>🔒 Security Reminder:</strong> Never share your OTP code with anyone. Z00MEX staff will never ask for your OTP.
            </div>
            
            <p style="margin-top: 30px; color: #666;">If you didn't request this password recovery, please ignore this email. Your account remains secure.</p>
            
            <p style="margin-top: 20px;">Best regards,<br><span class="brand">Z00MEX Security Team</span></p>
          </div>
          
          <div class="footer">
            <p>&copy; 2024 Z00MEX. All rights reserved.</p>
            <p>This is an automated security email. Please do not reply to this message.</p>
          </div>
        </div>
      </body>
      </html>
    `
  });
  
  $app.newMailClient().send(message);
  e.next();
}, "passwordRecoveryOtps");