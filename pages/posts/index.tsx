import type { NextPage, GetStaticProps } from 'next'

// components
import PostGrid from "@/components/posts/PostGrid"

// api
import { apiHelper } from '@/utils/api.util'

// schema
import { IPost } from "@/schema/posts.schema"

// mocks
import { postsMock } from "@/mocks/posts.mock"

interface Props {
  posts: IPost[]
}

const Posts: NextPage<Props> = ({ posts }: Props): React.ReactElement => {
  console.log('posts', posts)
  return (
    <section className="main-container">
      <h1 className="text-6xl">All Posts</h1>
      <PostGrid posts={posts} />
    </section>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    await apiHelper().posts.connect()

    const posts = await apiHelper().posts.retrieveAll()
  
    if (!posts.length) {
      throw new Error("Could not retrive any posts");
    }

    return {
      props:{
        posts
      },
      revalidate: 300,
    }
  } catch (error) {
    return {
      notFound: true,
    }
  }
}

export default Posts
