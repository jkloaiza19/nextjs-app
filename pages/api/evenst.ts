import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'
import { RequestMethod } from './utils/schema'

// controller
import { handleNewsLetterSubscription } from './controllers/events.controller'

const handler = (req: NextApiRequest, res: NextApiResponse) => {

}

export default handler