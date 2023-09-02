// import { useRouter } from "next/router"
import Link from 'next/link'
import Head from 'next/head'

// components
import EventSummary from '../../components/event-detail/event-summary'
import EventContent from '../../components/event-detail/event-content'
import EventLogistics from '../../components/event-detail/event-logistics'
import Comments from '../../components/input/comments'

// schema
import type { Context } from '@/schema/page.schema'
import { IEventPageProps } from '../../schema/events.schema'

// utils
import { getEventById, getFeatureEvents } from '../../utils/api.util'


const EventIdPage: React.FC<IEventPageProps> = ({ event }: IEventPageProps): React.ReactElement => {
  console.log('event', event)

  if (!event) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    )
  }

  return (
    <div>
      <Head>
        <title>{event.title}</title>
        <meta
          title={event.title}
          content={`Join ${event.title} at ${event.location} on ${event.date}`}
        />
      </Head>
      <EventSummary title={event?.title} />
      <EventLogistics
        date={event?.date}
        address={event?.location || ''}
        image={event?.image}
        imagAlt={event?.title || 'event'}
      />
      <EventContent>
        <p>{event?.description}</p>
      </EventContent>
      <Comments eventId={event.id} />
    </div>
  )
}

export const getStaticProps = async ({ params }: Context) => {
  const { id } = params

  try {
    const event = await getEventById(id)

    return {
      props: {
        event,
      },
      revalidate: 30,
    }
  } catch (error) {
    return {
      notFound: true,
    }
  }
}

export const getStaticPaths = async () => {
  const events = await getFeatureEvents()
  const paths = events.map((event) => ({ params: { id: event.id } }))

  return {
    paths,
    fallback: true, // set this true to render not pre generated events
  }
}

export default EventIdPage