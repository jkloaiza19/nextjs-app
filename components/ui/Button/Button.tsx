import Link from "next/link"

// styles
import styles from './Button.module.css'

interface ButtonProps {
  children: React.ReactNode,
  link?: string,
  onClick?: () => void | null,
}

const Button: React.FC<ButtonProps> = ({
  children,
  link,
  onClick,
}: ButtonProps): React.ReactElement => {
   if (link) {
    return (
      <Link href={link} className={styles.btn}>
        {children}
      </Link>
    )
  }

  return (
    <button className={styles.btn} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button