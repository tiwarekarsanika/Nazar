import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import redisRoutes from './routes/redisRoutes.js'
import kProducerRoutes from './routes/kProducerRoutes.js'

const app = express()
dotenv.config()
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/redis', redisRoutes);
app.use('/kafka', kProducerRoutes);

app.get('/', (req, res) => {
    res.send("Welcome to the express server!")
});

export default app