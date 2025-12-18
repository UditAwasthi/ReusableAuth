import { text } from "express";
import Mailgen from "mailgen";
import nodemailer from "nodemailer";


const sendEmail = async (options) => {
    const mailGenerator = new Mailgen({
        theme: "default",
        product: {
            name: "Task Manager",
            link: "https://taskmanagerlink.com"
        }
    }
    )
    const emailHtml = mailGenerator.generate(options.mailgenContent)
    const emailTextual = mailGenerator.generatePlaintext(options.mailgenContent)
    nodemailer.createTransport({
        host: process.env.MAILTRAP_SMTP_HOST,
        port: process.env.MAILTRAP_SMTP_PORT,
        auth: {
            user: process.env.MAILTRAP_SMTP_USER,
            pass: process.env.MAILTRAP_SMTP_PASS,
        }
    })

    const mail = {
        from: "mail.taslmanager@example.com",
        to: options.email,
        subject: isObjectIdOrHexString.subject,
        text: emailTextual,
        html: emailHtml
    }

    try {
        await transporter.sendEmail(mail)
    } catch (error) {
        console.error(error)
    }
}

const emailVerifactionMailgenContent = (username, verificationUrl) => {
    return {
        body: {
            name: username,
            intro: "Welcome to our App! We are excited to have you on board.",
            action: {
                instructions: "To verify your email please click on the following button",
                button: {
                    color: "rgba(30, 179, 20, 1)",
                    text: "Verify your email",
                    link: verificationUrl
                },
            },
            outro: "Need Help, or have questions? Just reply to this email, we'd love to help."
        }
    }
}



const forgotPasswordMailgenContent = (username, passwrordResetUrl) => {
    return {
        body: {
            name: username,
            intro: "We got a request ot reset the password of your account",
            action: {
                instructions: "To reset your password please click on the following button",
                button: {
                    color: "rgba(27, 227, 104, 1)",
                    text: "Reset Password",
                    link: passwrordResetUrl,
                },
            },
            outro: "Need Help, or have questions? Just reply to this email, we'd love to help."
        }
    }
}

export {
    emailVerifactionMailgenContent,
    forgotPasswordMailgenContent,
    sendEmail,
}