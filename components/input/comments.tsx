import { useState, useEffect, useContext } from 'react';

// components
import CommentList from './comment-list';
import NewComment from './new-comment';

// api
import { apiRequest } from '@/pages/api/utils/apiRequest'
import { RequestMethod } from '@/pages/api/utils/schema'

// context
import NotificationContext from '@/context/notification.context'

// styles
import classes from './comments.module.css';

function Comments(props: Record<string, any>) {
  // const
  const { eventId } = props

  // state
  const [showComments, setShowComments] = useState(false)
  const [comments, setComments] = useState([])

  // context
  const notificationCtx = useContext(NotificationContext)


  // effect
  useEffect(() => {
    const fetchData = async () => {
      const data = await apiRequest({
        url: `/api/comments/${eventId}`,
      })

      setComments(data.comments)
    }

    if (showComments) {
      fetchData()
    }

  }, [showComments, eventId])

  // actions
  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus)
  }

  async function addCommentHandler({ email, name, text: comment }: Record<string, string>) {
    notificationCtx.showNotification({
      title: 'Comments',
      message: 'Saving your comment',
      status: 'pending'
    })

    try {
      const result = await apiRequest({
        url: `/api/comments/${eventId}`,
        options: {
          method: RequestMethod.POST,
          body: JSON.stringify({
            email,
            name,
            comment,
          })
        }
      })

      notificationCtx.showNotification({
        title: 'Comment Saved',
        message: 'Your comment has been saved successfully!',
        status: 'success'
      })
    } catch (error) {
      console.log('error', error)

      notificationCtx.showNotification({
        title: 'Success',
        message: 'Successfully saved your comment.',
        status: 'success'
      })
    }

  }

  console.log('comments', comments)

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList comments={comments} />}
    </section>
  );
}

export default Comments;