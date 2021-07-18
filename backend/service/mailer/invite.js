"use strict";
module.exports = (to, subject, dates, hash_name) => {
 
    const nodemailer = require("nodemailer");

    // async..await is not allowed in global scope, must use a wrapper
    async function main() {
      // Generate test SMTP service account from ethereal.email
      // Only needed if you don't have a real mail account for testing

    
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
      await transporter.sendMail({
        from: '"ZeroFiveLab" otp@zerofivelabs.com', // sender address
        to: to, // list of receivers
        subject: "Inivitation Meeting", // Subject line
        html: `<div class="gmail">
                <p>You're invited to meeting room ${subject}</p>
                <a href="https://calendar.google.com/calendar/render?action=TEMPLATE&dates=${dates}&details=https://live.zerofivelab.com/meeting/${hash_name}&text=${subject}" class="cta btn-yellow" style="background-color: #F4D66C; font-size: 18px; font-family: Helvetica, Arial, sans-serif; font-weight:bold; text-decoration: none; padding: 14px 20px; color: #1D2025; border-radius: 5px; display:inline-block; mso-padding-alt:0; box-shadow:0 3px 6px rgba(0,0,0,.2);"><span style="mso-text-raise:15pt;">Add to your Calendar</span></a>
                            
                </div>`, // html body
    });


    console.log('Invite success')

    
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    }
    
    main().catch(console.error);
}