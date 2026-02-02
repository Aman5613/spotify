import express from 'express';
import sendEmail from "../src/utils/email.js"


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


sendEmail("amankumargupta762@gmail.com", "Test Email", "This is a test email", "<h1>This is a test email</h1>");

app.get('/', (req, res) => {
  res.send('Notification Service is running');
})



export default app;

