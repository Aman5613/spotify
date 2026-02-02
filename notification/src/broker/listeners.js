import { subscribeToQueue } from "./rabbit.js";
import sendEmail from "../utils/email.js";

function listenForNotifications() {
    subscribeToQueue("user_registered", async (data) => {
        const { email, fullName : {firstName, lastName}, role} = data;

        const template = `
        <h1>Welcome to Our Service, ${firstName} ${lastName}!</h1>
        <p>We're excited to have you on board as a ${role}.</p>
        <p> hope you enjoy using our platform and find it valuable for your needs. </p>
        <p>If you have any questions, feel free to reach out to our support team.</p>
        <p>Best regards,<br/>The Team</p>
        <p> SPotify piper </p>
        `;

        await sendEmail(email, "Welcome to Our Service", "thank you for registering with us", template);
    });
}

export default listenForNotifications