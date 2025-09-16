import { redisConsumer } from "../kafka/consumer.js";
// import redisClient from '../redis/config.js';

const redisConsumerAPI = async (redisClient) => {
    await redisConsumer.connect()
    await redisConsumer.subscribe({ topic: 'nazar-user-events' })

    await redisConsumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            try {
                const event = JSON.parse(message.value.toString());

                console.log({
                    topic,
                    partition,
                    value: message.value.toString()
                })

                if (event.eventType === "views") {
                    await redisClient.xAdd(
                        `clicks:${event.userID}`,
                        '*',
                        { productID: event.productID, ts: event.timestamp }
                    );
                }
                else if (event.eventType === "wishlist") {
                    await redisClient.zAdd(
                        `wishlist:${event.userID}`,
                        [{ score: Date.parse(event.timestamp) , value: event.productID }]
                    );
                }
                else if (event.eventType === "purchase") {
                    await redisClient.hSet(
                        `order:${event.orderID}`,
                        { productID: event.productID, ts: event.timestamp }
                    );
                    await redisClient.sAdd(`orders:${event.userID}`, event.orderID);
                }

            } catch (err) {
                console.log("Failed to process Kafka message:", err);
            }
        }
    })
}

export default redisConsumerAPI;
// redisConsumerAPI(redisClient)