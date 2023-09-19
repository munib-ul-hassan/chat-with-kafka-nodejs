import { config } from 'dotenv'

config()

const dbConfig = {
    // MongoDB connection string
    db: process.env.dbURL,
}

export default dbConfig
