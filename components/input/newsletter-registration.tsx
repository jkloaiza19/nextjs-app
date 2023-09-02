import React, { useRef, useState } from 'react'

// components
import classes from './newsletter-registration.module.css'

// api
import { apiRequest } from '../../pages/api/utils/apiRequest'
import { RequestMethod } from '../../pages/api/utils/schema'

function NewsletterRegistration() {
  // state
  const [signedUp, setSignedUp] = useState<boolean>(false)

  // ref
  const emailRef = useRef<HTMLInputElement>(null)

  function registrationHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const email = emailRef.current?.value

    if (!email || !email.includes('@')) {
      return false
    }

    apiRequest({
      url: '/api/newsletter',
      options: {
        method: RequestMethod.POST,
        body: JSON.stringify({ email }),
      },
    })
    .then((data) => {
      console.log('data', data)
      setSignedUp(true)
    })
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            style={{ color: 'black' }}
            ref={emailRef}
            type='email'
            id='email'
            placeholder='Your email'
            aria-label='Your email'
          />
          <button>Register</button>
        </div>
      </form>
      {signedUp && <p style={{ color: 'green' }}>Signed Up successfully!!</p>}
    </section>
  );
}

export default NewsletterRegistration;