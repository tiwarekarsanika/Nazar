import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import redisClient from './redis/config.js'
import redisRoutes from './routes/redisRoutes.js'
import bodyParser from 'body-parser'
import kafka from './kafka/config.js'
import kafkaProducer from './kafka/producer.js'
import kafkaConsumer from './kafka/consumer.js'

const app = express()
dotenv.config()
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const port = process.env.EXPRESS_PORT || 5000;

// console.log("username ", process.env.REDIS_USERNAME, " password ", process.env.REDIS_PASSWORD, " host ", process.env.REDIS_HOST, " at port ", process.env.REDIS_PORT)
redisClient.on('error', err => console.log('Redis Client Error', err));

await redisClient.connect();

await redisClient.set('ping', 'pong');
const result = await redisClient.get('ping');
console.log("Connected to redis successfully: ", result);

kafkaProducer(kafka)
kafkaConsumer(kafka)

app.use('/redis', redisRoutes);

app.get('/', (req, res) => {
    res.send("Welcome to the express server!")
});

app.listen(port, () => {
    console.log(`Express server running on port ${port}`)
});