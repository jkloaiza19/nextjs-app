import { IPost } from "@/schema/posts.schema"

export const postsMock: IPost[] = [
  {
    author: 'Juank',
    content: '# This is my first post content',
    title: 'My first post',
    id: '123asd',
    slug: 'my-first-post',
    image: 'getting-started-nextjs.png',
    createdAt: new Date().toDateString(),
    isFeatured: true,
  },
  {
    author: 'Juan Carlos',
    content: '# This is my second post content',
    title: 'My second post',
    id: 'dsa123',
    slug: 'my-second-post',
    image: 'nextjs-file-based-routing.png',
    createdAt: new Date().toDateString(),
    isFeatured: true
  },
]