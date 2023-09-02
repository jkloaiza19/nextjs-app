import { createContext, useState, useEffect } from "react"
import {
  INotificationContext,
  IContextProviderProps,
  Notificaction,
} from './schema'

const NotificationContext = createContext<INotificationContext>({
  showNotification: (_notificactionData: Notificaction) => {},
  hideNotification: () => {},
  notification: null,
})

export const NotificationContextProvider = ({ children }: IContextProviderProps) => {
  const [activeNotification, setActiveNotification] = useState<Notificaction>(null)

  useEffect(() => {
    if (
      activeNotification && (
      activeNotification.status === 'error' ||
      activeNotification.status === 'success'
    )) {
      const timer = setTimeout(() => setActiveNotification(null), 3000)

      return () => {
        clearTimeout(timer)
      }
    }
  }, [activeNotification])

  const handleShowNotification = (notificactionData: Notificaction) =>
    setActiveNotification(notificactionData)

  const handleHideNotification = () =>
    setActiveNotification(null)

  const context: INotificationContext = {
    showNotification: handleShowNotification,
    hideNotification: handleHideNotification,
    notification: activeNotification, 
  }

  return (
  
  <NotificationContext.Provider value={context}>
    {children}
  </NotificationContext.Provider>
  )
}

export default NotificationContext