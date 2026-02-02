import app from "./src/app.js";
import connectDB from "./src/db/db.js";
import { connectRabbitMQ } from "./src/broker/rabbit.js";


connectDB();
connectRabbitMQ();

app.listen(3000, () => {
    console.log("Auth Server is running on port 3000");
});