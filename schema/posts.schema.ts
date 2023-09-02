export interface IPost {
  id: string
  title: string
  content: string
  image?: string
  author: string
  slug: string
  createdAt: string
  excerpt?: string
  isFeatured: boolean
}