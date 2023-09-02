// schema
import type { IEventList } from '../schema/events.schema'
import type { GenericObject } from '../schema/page.schema'

// api
// import client from '@/pages/api/utils/database'
import { DBCollections } from '@/pages/api/utils/schema'
import { DBConnection } from '@/pages/api/utils/schema'
import { IPost } from '@/pages/api/utils/schema'

const EVENTS_BASE_URL = 'https://nextjs-project-jk-default-rtdb.firebaseio.com/events.json'


export const formatEvents = (jsonData: GenericObject): IEventList =>
  Object.keys(jsonData).map((key) => jsonData[key])

export const getAllEvents = async () => {
    const data = await fetch(EVENTS_BASE_URL)
    const jsonData = await data.json()
    const events = formatEvents(jsonData)

    return events
}

export const getFeatureEvents = async () => {
  const events = await getAllEvents()

  return events.filter((event) => event.isFeatured)
}

export const getEventById = async (id: string) => {
  const events = await getAllEvents()

  return events.find((event) => event.id === id)
}

export const getFilteredEvents = async (datefilter: GenericObject): Promise<IEventList> => {
  const { year, month } = datefilter
  
  const events = await getAllEvents()

  const filteredevents = events.filter((event) => {
    const eventDate = new Date(event.date)
    console.log('event.date', event.date)
    console.log('eventDate', eventDate)
    console.log('eventDate.getFullYear()', eventDate.getFullYear())
    console.log('eventDate.getMonth()', eventDate.getMonth())
    console.log('month', month)

    return eventDate.getFullYear() === year
      && eventDate.getMonth() === month - 1
  })

  return filteredevents
}

export const apiHelper = () => ({
  posts: new DBConnection<IPost>(DBCollections.posts)
})
