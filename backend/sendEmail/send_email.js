const nodeMailer = require("nodemailer");

const sendEmail = async (options)=>{

    const transporter = nodeMailer.createTransport({
        host:"smtp.gmail.com" ,
        port: 4000,
        service:"gmail",
        auth:{
            user:"vanshika2000chanktia@gmail.com",
            pass:"lrvcgcbdhzruaijw",
        }
    })

    const mailOptions ={
         
        from:"vanshika2000chanktia@gmail.com",
        to:options.email,
        subject:options.subject,
        text:options.message,

    };

    transporter.sendMail(mailOptions, (error) => {
        if (error) {
            console.log(error);
        } else {
            console.log('send');
        }
    });

};

module.exports = sendEmail;