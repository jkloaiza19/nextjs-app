import type { NextApiRequest, NextApiResponse } from 'next'

// api
import client from '../utils/database'
import { DBCollections } from '../utils/schema'

export const handleNewsLetterSubscription = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email } = req.body
  
  if (!email || !email.includes('@')) {
    res.status(422).json({ message: 'Invalid email address' })
  }

  try {
    await client.connect()

    const db = client.db()
    const result = await db.collection(DBCollections.emails).insertOne({ email })

    res.status(201).json({ result })
    
  } catch (error) {
    res.status(500).json({ error })
  } finally {
    await client.close()
  }
}