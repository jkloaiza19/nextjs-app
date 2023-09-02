require('dotenv').config()
// const { MongoClient, ServerApiVersion } = require('mongodb')
import { MongoClient, ServerApiVersion } from 'mongodb'

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client: Record<string, any> = new MongoClient(process.env.MONGODB_URL || '', {
  maxPoolSize: 5000,
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
})

export default client
