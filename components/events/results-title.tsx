import Button from '../ui/Button/Button'
import styles from './results-title.module.css'

function ResultsTitle(props: Record<string, any>) {
  const { date } = props

  const humanReadableDate = new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  })

  return (
    <section className={styles.title}>
      <h1>Events in {humanReadableDate}</h1>
      <br />
      <Button link='/events'>Show all events</Button>
    </section>
  )
}

export default ResultsTitle