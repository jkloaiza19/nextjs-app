import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'
import { RequestMethod } from './utils/schema'

// controller
import { handleNewsLetterSubscription } from './controllers/newsletter.controller'

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === RequestMethod.POST) {
    handleNewsLetterSubscription(req, res)
  }
}

export default handler