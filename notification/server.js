import app from "./src/app.js";
import { connectRabbitMQ } from "./src/broker/rabbit.js";
import listenForNotifications from "./src/broker/listeners.js";


// Initialize RabbitMQ connection and start listening for notifications
await connectRabbitMQ().then(() => listenForNotifications());

app.listen(3000, () => {
  console.log("Notification server is running on port 3000");
});