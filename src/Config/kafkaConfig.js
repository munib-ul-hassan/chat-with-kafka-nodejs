
import { Kafka } from "kafkajs";
class KafkaConfig {
    constructor() {
        this.kafka = new Kafka({
            clientId: "nodejs-kafka",
            brokers: ["192.168.1.26:9092"]
        })
        this.producer = this.kafka.producer()
        this.consumer = this.kafka.consumer({ groupId: "test" })
    }
    async produce(topic, message) {
        try {
            await this.producer.connect()
            await this.producer.send({
                topic,
                messages:message
            })

        } catch (e) { console.log(e) }
        finally { await this.producer.disconnect() }

    }
    async consume(topic, callback) {
        try {
            await this.consumer.connect()
            await this.consumer.subscribe({
                topic,
                fromBeginning: true
            })
            await this.consumer.run(
                {
                    eachMessage: async ({ topic, partition, message }) => {
                        const value = message.value.toString()
                        callback(value)
                    }
                }
            )

        } catch (e) { console.log(e) }

    }

}

export default KafkaConfig