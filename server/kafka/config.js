import { Kafka } from 'kafkajs'

const kafka = new Kafka({
  clientId: 'nazar-app',
  brokers: ['kafka:9092'],
})

export default kafka;