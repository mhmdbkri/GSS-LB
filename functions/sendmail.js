// https://app.netlify.com/sites/vibrant-goodall-c5cf08/settings/domain#https
// https://css-tricks.com/netlify-functions-for-sending-emails/
// https://css-tricks.com/using-netlify-forms-and-netlify-functions-to-build-an-email-sign-up-widget/
// https://rajrajhans.com/2020/07/using-netlify-lambda-functions-and-sendgrid-to-send-mail/
// https://support.sendgrid.com/hc/en-us?return_to=%2Fhc%2Frequests

// functions/sendmail.js
//require("dotenv").config();

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
exports.handler = async (event, context, callback) => {
  const data = JSON.parse(event.body);
  const { email, subject } = data;
  const body = Object.keys(data)
    .map((k) => {
      return `${k}: ${data[k]}`;
    })
    .join("<br><br>");
  const mail_to_send = {
    to: "mohyddintash@gmail.com",
    from: email,
    subject: subject ? subject : "New Message from Contact Form",
    html: body,
  };
  try {
    await sgMail.send(mail_to_send);
    return {
      statusCode: 200,
      body: "Message sent successfully",
    };
  } catch (e) {
    return {
      statusCode: e.code,
      body: e.message,
    };
  }
};
