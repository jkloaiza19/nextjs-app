import type { NextApiRequest, NextApiResponse } from 'next'

// api
import client from '../utils/database'
import { DBCollections, IComment, DBConnection } from '../utils/schema'

const hasInputError = (
  email: string,
  name: string,
  comment: string
) => (
    !email ||
    !email.includes('@') ||
    !name ||
    name.trim() === '' ||
    !comment
)

export const handleCreateComment = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, name, comment } = req.body
  const { eventId } = req.query

  let dbClient = new DBConnection<IComment>(DBCollections.comments, client)

  if (hasInputError(email, name, comment)) {
    return res.status(422).json({ message: 'Invalid inputs' })
  }

  try {
    await dbClient.connect()
console.log('eventId', eventId)
    const result = await dbClient.insertOne({
      eventId,
      email,
      name,
      comment,
    })

    return res.status(201).json({ result })
  } catch (error) {
    return res.status(500).json({ error })
  } finally {
    // await dbClient.close()
  }
}

export const hadleGetAllComments = async (req: NextApiRequest, res: NextApiResponse) => {
  const { eventId } = req.query
  let dbClient = new DBConnection<IComment>(DBCollections.comments, client)
  try {
    await dbClient.connect()

    const comments = await dbClient.retrieveAllWithQuery({ eventId })

    return res.status(200).json({ comments })
  } catch (error) {
   return res.status(500).json({ error }) 
  } finally {
    // await dbClient.close()
  }
}