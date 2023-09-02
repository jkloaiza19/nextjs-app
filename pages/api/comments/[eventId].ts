import type { NextApiRequest, NextApiResponse } from 'next'
import { RequestMethod } from '../utils/schema'
import { handleCreateComment, hadleGetAllComments } from '../controllers/comments.controller'

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case RequestMethod.POST:
      handleCreateComment(req, res)
      break
    case RequestMethod.GET:
      hadleGetAllComments(req, res)
      break
  }
}

export default handler