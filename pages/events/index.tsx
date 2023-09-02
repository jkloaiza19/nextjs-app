import { Fragment } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

// components
import EventList from '@/components/events/EventList'
import EventsSearch from '@/components/events/events-search'

// utils
import { getAllEvents } from '../../utils/api.util'

// schema
import type { IEventListPageProps } from '../../schema/events.schema'


function AllEventsPage({ events }: IEventListPageProps) {
  const router = useRouter()

  const findEventsHandler = (year: string, month: string) => {
    const fullPath = `/events/${year}/${month}`
    
    router.push(fullPath)
  }

  return (
    <Fragment>
      <Head>
        <title>All events</title>
        <meta title='description' content='Computing events for everyone' />
      </Head>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList events={events} />
    </Fragment>
  )
}

export const getStaticProps = async () => {
  try {
    const events = await getAllEvents()

    return {
      props: {
        events,
      },
      revalidate: 300,
    }
  } catch (error) {
    return {
      notFound: true,
    }
  }
}

export default AllEventsPage