import type { NextPage, GetStaticProps, GetStaticPaths } from 'next'

// components
import PostContent from "@/components/posts/post-content/PostContent"

// api
import { apiHelper } from '@/utils/api.util'

// schema
import { Context } from '@/schema/page.schema' 
import { IPost } from "@/schema/posts.schema"

interface Props {
  post: IPost
}

const Post: NextPage<Props> = ({ post }: Props): React.ReactElement => {
  return(
    <section className="main-container">
      <PostContent post={post} />
    </section>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }: Context) =>{
  const { slug } = params

  try {
    await apiHelper().posts.connect()

    const post = await apiHelper().posts.findOne({ slug })

    if (!post) {
      throw new Error('Post not found')
    }

    return {
      props: {
        post,
      },
      revalidate: 600,
    }
  } catch (error) {
    return {
      notFound: true
    }
  }
}

export const getStaticPaths = async () => {
  try {
    await apiHelper().posts.connect()

    const posts = await apiHelper().posts.retrieveAll()
    const paths = posts.map((post) => ({ params: { slug: post.slug } }))
    console.log('paths', paths)
    return {
      paths: [...paths],
      fallback: false
    }
  } catch (error) {
    console.log('esta mierda falló')
    return {
      notFound: true,
    }
  }
}

export default Post