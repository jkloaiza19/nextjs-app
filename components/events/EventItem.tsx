import Image from "next/image"
import Link from "next/link"

// components
import Button from "../ui/Button/Button"

// icons
import AddressIcon from '../icons/address-icon'
import ArrowRight from '../icons/arrow-right-icon'
import DateIcon from '../icons/date-icon'

// schema
import type { IEvent } from '../../schema/events.schema'

// styles
import styles from './EventItem.module.css'

const EventItem: React.FC<IEvent> = ({
  id,
  title,
  description,
  location,
  date,
  image,
  isFeatured,
}: IEvent): React.ReactElement => {
  const parsedDate = new Date(date!).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <li className={styles.item}>
      <Image src={`/${image}`} alt={title ?? ''} width={100} height={100} />
      <div className={styles.content}>
        <div className={styles.summary}>
          <h2>{title}</h2>
          <div className={styles.date}>
            <DateIcon />
            <time>{parsedDate}</time>
          </div>
          <div className={styles.address}>
            <AddressIcon />
            <address>{location?.replace(', ', '\n')}</address>
          </div>
        </div>
        <div className={styles.actions}>
          <Button link={`/events/${id}`}>
            <span>Explore Event</span>
            <span className={styles.icon}><ArrowRight /></span>
          </Button>
        </div>
      </div>
    </li>
  )
}
export default EventItem