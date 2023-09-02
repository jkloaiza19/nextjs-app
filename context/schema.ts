import React from "react"

export type Notificaction = {
  title: string
  message: string
  status: 'pending' | 'success' | 'error'
} | null

export interface INotificationContext {
  showNotification: (notificactionData: Notificaction) => void
  hideNotification: () => void
  notification: Notificaction
}

export interface IContextProviderProps {
  children: React.ReactNode
}