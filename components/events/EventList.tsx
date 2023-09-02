import React from "react"

// components
import EventItem from "./EventItem"

// schema
import type { IEventList } from '../../schema/events.schema'

// styles
import styles from './EventList.module.css'

interface Props {
  events: IEventList
}

const EventList: React.FC<Props> = ({ events }: Props): React.ReactElement => (
  <ul className={styles.list}>
    {events.map(event => (
      <EventItem key={event.id} {...event} />
    ))}
  </ul>
)

export default EventList