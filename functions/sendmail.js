// https://app.netlify.com/sites/vibrant-goodall-c5cf08/settings/domain#https
// https://css-tricks.com/netlify-functions-for-sending-emails/
// https://css-tricks.com/using-netlify-forms-and-netlify-functions-to-build-an-email-sign-up-widget/
// https://rajrajhans.com/2020/07/using-netlify-lambda-functions-and-sendgrid-to-send-mail/
// https://support.sendgrid.com/hc/en-us?return_to=%2Fhc%2Frequests

// functions/sendmail.js
require("dotenv").config();

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
exports.handler = async (event, context, callback) => {
  console.log("function triggered!");

  const data = JSON.parse(event.body);

  const isInquiryForm = event.queryStringParameters.inquire;
  let subject;
  if (isInquiryForm == "1") {
    const { firstname, lastname } = data;
    subject = `New Inquiry Message from ${firstname} ${lastname}`;
  } else {
    const { email } = data;
    subject = "New Message from Contact Form from " + email;
  }
  console.log(data);
  const body = Object.keys(data)
    .map((k) => {
      return `${k}: ${data[k]}`;
    })
    .join("<br><br>");
  const mail_to_send = {
    to: "admin@gss-lb.com",
    from: "admin@gss-lb.com",
    subject: subject,
    html: body,
  };
  console.log(mail_to_send);
  try {
    await sgMail.send(mail_to_send);
    return {
      statusCode: 200,
      body: "Message sent successfully",
    };
  } catch (e) {
    console.log("error", e);
    console.log(body.errors);
    return {
      statusCode: e.code,
      body: e.message,
    };
  }
};
