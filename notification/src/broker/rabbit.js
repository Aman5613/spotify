import amqp from 'amqplib';
import config from "../config/config.js";

let channel, connection;


export const connectRabbitMQ = async () => {
    try {

        connection = await amqp.connect(config.RABBITMQ_URI);
        channel = await connection.createChannel();
        console.log("Connected to RabbitMQ");
        
    } catch (error) {
        console.error("RabbitMQ Connection Error:", error);
    }
}


export const publishToQueue = async (queueName, data) => {
    try {

        await channel.assertQueue(queueName, { durable: true });
        channel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)), {
            persistent: true
        });
        console.log("Message published to queue:", queueName);
        
    } catch (error) {
        console.error("Publish to Queue Error:", error.message || error);
    }
}

export const subscribeToQueue = async (queueName, callback) => {
    try {

        await channel.assertQueue(queueName, { durable: true });
        channel.consume(queueName, async (msg) => {
            if (msg !== null) {
                const data = JSON.parse(msg.content.toString());
                await callback(data);
                channel.ack(msg);
            }
        });
        
    } catch (error) {
        console.error("Subscribe to Queue Error:", error.message || error);
    }
}
