/// <reference path="../pb_data/types.d.ts" />
onRecordAfterCreateSuccess((e) => {
  const email = e.record.get("email");
  const otp = e.record.get("otp");
  
  const message = new MailerMessage({
    from: {
      address: $app.settings().meta.senderAddress,
      name: $app.settings().meta.senderName
    },
    to: [{ address: email }],
    subject: "Your Z00MEX Registration OTP",
    html: "<p>Your OTP code is: <strong>" + otp + "</strong></p><p>This code expires in 5 minutes.</p>"
  });
  
  $app.newMailClient().send(message);
  e.next();
}, "otp_store");