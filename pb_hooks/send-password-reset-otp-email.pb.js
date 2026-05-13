/// <reference path="../pb_data/types.d.ts" />
onRecordAfterCreateSuccess((e) => {
  const email = e.record.get("email");
  const otp = e.record.get("otp");
  
  const message = new MailerMessage({
    from: {
      address: "z00mex.com",
      name: "Z00MEX"
    },
    to: [{ address: email }],
    subject: "Password Reset Code - Z00MEX",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f5f5f5;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            overflow: hidden;
          }
          .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px 20px;
            text-align: center;
          }
          .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 600;
          }
          .content {
            padding: 40px 30px;
          }
          .content h2 {
            color: #333;
            font-size: 22px;
            margin-top: 0;
            margin-bottom: 20px;
          }
          .instruction {
            color: #666;
            font-size: 16px;
            margin-bottom: 30px;
            line-height: 1.8;
          }
          .otp-container {
            text-align: center;
            margin: 40px 0;
            padding: 30px;
            background-color: #f9f9f9;
            border-radius: 8px;
            border: 2px solid #667eea;
          }
          .otp-label {
            color: #999;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 15px;
          }
          .otp-code {
            font-size: 48px;
            font-weight: 700;
            color: #333;
            letter-spacing: 5px;
            font-family: 'Courier New', monospace;
            word-spacing: 10px;
          }
          .expiration {
            color: #e74c3c;
            font-size: 14px;
            margin-top: 20px;
            font-weight: 600;
          }
          .warning {
            background-color: #fff3cd;
            border-left: 4px solid #ffc107;
            padding: 15px;
            margin: 30px 0;
            border-radius: 4px;
            color: #856404;
            font-size: 14px;
          }
          .footer {
            background-color: #f5f5f5;
            padding: 20px 30px;
            text-align: center;
            border-top: 1px solid #e0e0e0;
            font-size: 12px;
            color: #999;
          }
          .footer-brand {
            font-weight: 600;
            color: #333;
            margin-bottom: 5px;
          }
          .footer-disclaimer {
            font-size: 11px;
            color: #bbb;
            margin-top: 10px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Password Reset Request</h1>
          </div>
          
          <div class="content">
            <h2>Reset Your Password</h2>
            
            <p class="instruction">
              We received a request to reset your Z00MEX account password. Use the code below to proceed with resetting your password. This code is valid for <strong>15 minutes</strong>.
            </p>
            
            <div class="otp-container">
              <div class="otp-label">Your Reset Code</div>
              <div class="otp-code">${otp}</div>
              <div class="expiration">Expires in 15 minutes</div>
            </div>
            
            <div class="warning">
              <strong>⚠️ Security Notice:</strong> If you didn't request this password reset, please ignore this email. Your account remains secure.
            </div>
          </div>
          
          <div class="footer">
            <div class="footer-brand">Z00MEX Team</div>
            <div class="footer-disclaimer">This is an automated message. Please do not reply to this email.</div>
          </div>
        </div>
      </body>
      </html>
    `
  });
  
  $app.newMailClient().send(message);
  e.next();
}, "passwordResetOtps");