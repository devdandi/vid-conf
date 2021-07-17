"use strict";


module.exports = (type, to, token) => {
 
    const nodemailer = require("nodemailer");

    // async..await is not allowed in global scope, must use a wrapper
    async function main() {
      // Generate test SMTP service account from ethereal.email
      // Only needed if you don't have a real mail account for testing
      let testAccount = await nodemailer.createTestAccount();
    
      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: "adulminomo@gmail.com", // generated ethereal user
            pass: "dandi129", // generated ethereal password
          },
      });

      if (type == "register") {
        let info = await transporter.sendMail({
            from: '"ZeroFiveLab" otp@zerofivelabs.com', // sender address
            to: to, // list of receivers
            subject: "Activation Account ZeroFiveLab", // Subject line
            html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
            <div style="margin:50px auto;width:70%;padding:20px 0">
            <div style="border-bottom:1px solid #eee">
                <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">ZeroFiveLab</a>
            </div>
            <p style="font-size:1.1em">Hi,</p>
            <p>Thank you for choosing ZeroFiveLab. Please activate your account</p>
            <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;"><a href="http://localhost:8080/activate/${token}">Activate</a></h2>
            <p style="font-size:0.9em;">Regards,<br />ZeroFiveLab</p>
            <hr style="border:none;border-top:1px solid #eee" />
            <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
                <p>ZeroFiveLab</p>
                <p><a href="https://meet.zerofivelab.com">https://meet.zerofivelab.com</a></p>
                <p>Indonesia</p>
            </div>
            </div>
        </div>`, // html body
        });
        console.log("Message sent: %s", info.messageId);
      }else{
        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"ZeroFiveLab" otp@zerofivelabs.com', // sender address
            to: to, // list of receivers
            subject: "Confirmation OTP ZeroFiveLab", // Subject line
            html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
            <div style="margin:50px auto;width:70%;padding:20px 0">
            <div style="border-bottom:1px solid #eee">
                <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">ZeroFiveLab</a>
            </div>
            <p style="font-size:1.1em">Hi,</p>
            <p>Thank you for choosing ZeroFiveLab. Use the following OTP to complete your Sign In procedures. OTP is valid for 5 minutes</p>
            <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${token}</h2>
            <p style="font-size:0.9em;">Regards,<br />ZeroFiveLab</p>
            <hr style="border:none;border-top:1px solid #eee" />
            <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
                <p>ZeroFiveLab</p>
                <p><a href="https://meet.zerofivelab.com">https://meet.zerofivelab.com</a></p>
                <p>Indonesia</p>
            </div>
            </div>
        </div>`, // html body
        });
        console.log("Message sent: %s", info.messageId);

      }
    

    
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    }
    
    main().catch(console.error);
}