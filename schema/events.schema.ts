export interface IEvent {
  id?: string,
  title?: string,
  description?: string
  location?: string,
  date: string,
  image?: string,
  isFeatured?: boolean,
}

export type IEventList = IEvent[]

export interface IEventListPageProps {
  events: IEventList
}

export interface IEventPageProps {
  event: IEvent
}