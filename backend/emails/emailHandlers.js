import { mailtrapClient, sender } from "../lib/mailtrap.js";
import { createWelcomeEmailTemplate , createCommentNotificationEmailTemplate, createConnectionAcceptedEmailTemplate } from "./emailTemplates.js";

export const sendWelcomeEmail = async (email, name, profileUrl) => {
    const recipient = [{email}]

    try{
        const response = await mailtrapClient.send({
            from: sender,
            to : recipient,
            subject: "Welcome to Linkedin Clone",
            html: createWelcomeEmailTemplate(name, profileUrl),
            category: "welcome"
        })

        console.log(" Welcome Email Send Successfully", response)
    }catch(error) {
        throw error;
    }
}

export const sendCommentNotificationEmail = async (
    recipientEmail,
    recipientName,
    commenterName,
    postUrl,
    commentContent
) => {
    const recipient = [{email: recipientEmail}]

    try{
        const response = await mailtrapClient.send({
            from: sender,
            to : recipient,
            subject: "New Comment on Your Post",
            html: createCommentNotificationEmailTemplate(recipientName, commenterName, postUrl, commentContent),
            category: "comment_notification",
        })

        console.log(" Notification Email Send Successfully", response)
    }catch(error) {
        throw error;
    }



}

export const sendConnectionAcceptedEmail = async (senderEmail,senderName, receipientName, profileUrl ) =>{
    const receipient = [{email : senderEmail}];

    try{
        const response = await mailtrapClient.send({
            from:sender,
            to: receipient,
            subject: `${receipientName} accepted your connection request`,
            html: createConnectionAcceptedEmailTemplate(senderName, receipientName, profileUrl),
            category: "connection accepted ",
        })
    }catch(error){}
}
