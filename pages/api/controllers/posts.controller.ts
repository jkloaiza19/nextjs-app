import type { NextApiRequest, NextApiResponse } from 'next'

// api
import client from '../utils/database'
import { DBCollections } from '../utils/schema'
import { DBConnection } from '../utils/schema'

// schema
import { IPost } from '../utils/schema'

export const handleGetAllPosts = async (_req: NextApiRequest, res: NextApiResponse): Promise<IPost[]> => {
  let dbClient = new DBConnection<IPost>(DBCollections.posts, client)

  try {
    await dbClient.connect()

    const posts: IPost[] = await dbClient.retrieveAll()

    if (!posts.length) {
      throw new Error("Could not retrive any posts");
    }

    return res.status(200).json({ posts })
  } catch (error) {
    return res.status(500).json({ error })
  }
}