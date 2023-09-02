import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'
import { RequestMethod } from './utils/schema'

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case RequestMethod.POST:
      feedbackController.createFeedback(req, res)
      break
    case RequestMethod.GET:
      feedbackController.getAllFeedback(req, res)
      break
    default:
      break;
  }
}

const getFeedbackFilePath = (): string =>
  path.join(process.cwd(), 'data', 'feedback.json')

const readFeedbackFile = (filePath: string): string => 
  fs.readFileSync(filePath).toString()

const feedbackController = {
  createFeedback: (req: NextApiRequest, res: NextApiResponse) => {
    const { email, feedback } = req.body
    const newFeedback = { email, feedback }

    const filePath = getFeedbackFilePath()
    const feedbackFile = readFeedbackFile(filePath)
    const currentData = JSON.parse(feedbackFile)
    currentData.push(newFeedback)

    fs.writeFileSync(filePath, JSON.stringify(currentData))
    res.status(201).json({ message: 'Success', newFeedback })
  },

  getAllFeedback: (_req: NextApiRequest, res: NextApiResponse) => {
    const filePath = getFeedbackFilePath()
    const feedbackFile = readFeedbackFile(filePath)
    const items = JSON.parse(feedbackFile)

    res.status(200).json({ items })
  },
}

// const postFeedback = (req: NextApiRequest, res: NextApiResponse) => {
//   const { email, feedback } = req.body
//   const newFeedback = { email, feedback }

//   const filePath = getFeedbackFilePath()
//   const feedbackFile = readFeedbackFile(filePath)
//   const currentData = JSON.parse(feedbackFile)
//   currentData.push(newFeedback)

//   fs.writeFileSync(filePath, JSON.stringify(currentData))
//   res.status(201).json({ message: 'Success', newFeedback })
// }

// const getAllFeedback = (req: NextApiRequest, res: NextApiResponse) => {
//   const filePath = getFeedbackFilePath()
//   const feedbackFile = readFeedbackFile(filePath)
//   const feedbackList = JSON.parse(feedbackFile)

//   res.status(200).json({ message: 'success',  feedbackList })
// }

export default handler