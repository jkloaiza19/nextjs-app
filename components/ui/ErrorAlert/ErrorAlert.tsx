//schema
import { ComponentProps } from '../../../schema/page.schema'

import classes from './ErrorAlert.module.css'

function ErrorAlert(props: ComponentProps) {
  return <div className={classes.alert}>{props.children}</div>
}

export default ErrorAlert