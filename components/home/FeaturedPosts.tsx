// components
import PostGrid from "@/components/posts/PostGrid"

// schema
import { IPost } from "@/schema/posts.schema"

interface Props {
  posts: IPost[]
}

const FeaturedPosts: React.FC<Props> = ({ posts }: Props): React.ReactElement => {
  return (
    <section className="flex flex-col justify-center items-center py-5">
      <h1 className="text-6xl">Featured Posts</h1>
      <PostGrid posts={posts} />
    </section>
  )
}

export default FeaturedPosts