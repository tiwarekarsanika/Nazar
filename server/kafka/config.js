import { Kafka } from 'kafkajs'

const kafka = new Kafka({
  clientId: 'nazar-server',
  brokers: ['kafka:9092'],
})

export default kafka;