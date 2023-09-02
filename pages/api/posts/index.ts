import type { NextApiRequest, NextApiResponse } from 'next'

// schema
import { RequestMethod } from '../utils/schema'

// controller
import { handleGetAllPosts } from '../controllers/posts.controller'

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === RequestMethod.GET) {
    handleGetAllPosts(req, res)
  }
}

export default handler