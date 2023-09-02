import React, { FormEvent, FormEventHandler, useRef, useState } from 'react'

// schema
import type { Props, Context } from '@/schema/page.schema'
import { RequestMethod, IFeedback } from './api/utils/schema'

// api
import { apiRequest } from './api/utils/apiRequest'

export const getServerSideProps = async (context: Context) => {
  const { params, req, res } = context
  console.log('params', typeof params)
  console.log('req', typeof req)
  console.log('res', typeof res)

  return {
    props: {
      userName: 'JuanK'
    }
  }
}

const UserSettingsPage = ({ userName }: Props) => {
  // state
  const [feedbackList, setFeedbackList] = useState<IFeedback[]>([])

  // refs
  const emailRef = useRef<HTMLInputElement>(null)
  const feedbackRef = useRef<HTMLTextAreaElement>(null)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const email = emailRef?.current?.value
    const feedback = feedbackRef?.current?.value

    apiRequest({
      url: '/api/feedback',
      options: {
        method: RequestMethod.POST,
        body: JSON.stringify({
          email,
          feedback,
        }),
      }
    })
    .then((data) => console.log('data', data))
  }

  const handleLoadFeedback = async () => {
    try {
     const data = await apiRequest({url: '/api/feedback'})
     const feedbackList = await data.json()

     setFeedbackList(feedbackList.items)
    } catch (error) {
      console.log('error:', error)
    }
  }

  return (
    <div>
      <h1>Welcome: {userName}</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email: </label>
        <input style={{ color: 'black' }} id="email" type="email" name="email" ref={emailRef} />
        <br /><br />
        <label htmlFor="feedback">Feedback: </label>
        <textarea style={{ color: 'black' }} id="feedback" name="feedback" ref={feedbackRef} />
        <br /><br />
        <input type="submit" />
      </form>
      <hr />
      <button onClick={handleLoadFeedback}>Load Feedback</button>
      <br />
      <ul>
        {!!feedbackList.length && feedbackList.map((item) => (
          <li key={item.email}>{item.feedback}</li>
        ))}
      </ul>
    </div>
  )
}

export default UserSettingsPage