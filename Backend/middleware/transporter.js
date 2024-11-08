import nodemailer from "nodemailer";
import "dotenv/config.js"

const email = process.env.EMAIL;
const password = process.env.password;

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    secure:true,
    auth: {
        user: email,
        pass: password
    }
});
export const sendMail = async (mailOptions)=>{

    try
    {
        const info = await transporter.sendMail({
            from:email,
            to:mailOptions.email,
            subject:mailOptions.subject,
            html:mailOptions.html
        });
    }
    catch(err)
    {
        console.log(err);
    }
};