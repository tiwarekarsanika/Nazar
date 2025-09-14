// import kafkaClient from './config'

const kafkaConsumer = async (kafkaClient) => {
    const consumer = kafkaClient.consumer({ groupId: 'test-group' })

    await consumer.connect()
    await consumer.subscribe({ topic: 'quickstart-events', fromBeginning: true })

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log({
                value: message.value.toString(),
            })
        },
    })

}

export default kafkaConsumer 