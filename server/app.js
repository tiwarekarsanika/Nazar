import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import redisRoutes from './routes/redisRoutes.js'
import kProducerRoutes from './routes/kProducerRoutes.js'
import client from 'prom-client'
import { verifySupabaseJWT } from './middleware/authMiddleware.js'

const app = express()
dotenv.config()

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/redis', verifySupabaseJWT, redisRoutes);
app.use('/kafka', verifySupabaseJWT, kProducerRoutes);

const register = new client.Registry();

client.collectDefaultMetrics(
    {
        register: register,
        prefix: "node_" // * Prefixes the default app metrics name with the specified string
    }
);

app.get("/metrics", async (req, res, next) => {
  res.setHeader("Content-type", register.contentType);
  res.send(await register.metrics());
  next();
});

app.get('/', (req, res) => {
    res.send("Welcome to the express server!")
});

export default app