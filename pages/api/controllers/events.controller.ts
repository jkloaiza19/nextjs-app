import type { NextApiRequest, NextApiResponse } from 'next'

export const handleNewsLetterSubscription = (req: NextApiRequest, res: NextApiResponse) => {
  const { email } = req.body
  
}