import { Fragment } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

import EventList from '@/components/events/EventList'
import ResultsTitle from '../../components/events/results-title'
import Button from '../../components/ui/Button/Button'
import ErrorAlert from '../../components/ui/ErrorAlert/ErrorAlert'

// schema
import type { Context, Props } from '@/schema/page.schema'

// api
import { getFilteredEvents } from '@/utils/api.util'


function FilteredEventsPage({ filteredEvents, date }: Props) {
  // const router = useRouter()

  // const filterData = router.query.slug

  // if (!filterData) {
  //   return <p className='center'>Loading...</p>
  // }

  // const filteredYear = filterData[0]
  // const filteredMonth = filterData[1]

  // const numYear = +filteredYear
  // const numMonth = +filteredMonth

  // if (
  //   isNaN(numYear) ||
  //   isNaN(numMonth) ||
  //   numYear > 2030 ||
  //   numYear < 2021 ||
  //   numMonth < 1 ||
  //   numMonth > 12
  // ) {
  //   return (
  //     <Fragment>
  //       <ErrorAlert>
  //         <p>Invalid filter. Please adjust your values!</p>
  //       </ErrorAlert>
  //       <div className='center'>
  //         <Button link='/events'>Show All Events</Button>
  //       </div>
  //     </Fragment>
  //   )
  // }

  // const filteredEvents = getFilteredEvents({
  //   year: numYear,
  //   month: numMonth,
  // })

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className='center'>
          <Button link='/events'>Show All Events</Button>
        </div>
      </Fragment>
    )
  }

  return (
    <Fragment>
      <Head>
        <title>All</title>
        <meta
          title="description"
          content={`Join these events on ${date}`}
        />
      </Head>
      <ResultsTitle date={date} />
      <EventList events={filteredEvents} />
    </Fragment>
  )
}

export const getServerSideProps = async ({ params }: Context) => {
  const { slug } = params
  const filteredYear = slug[0]
  const filteredMonth = slug[1]

  // converts values to number
  const year = +filteredYear
  const month = +filteredMonth

   if (
    isNaN(year) ||
    isNaN(month) ||
    year > 2030 ||
    year < 2021 ||
    month < 1 ||
    month > 12
  ) {
    return {
      notFound: true,
    }
  }

  const filteredEvents = await getFilteredEvents({ month, year })
  const date = new Date(year, month - 1)

  return {
    props:{
      filteredEvents,
      date: date.toLocaleDateString('en-US'),
    },
  }

}

export default FilteredEventsPage