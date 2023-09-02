// schema
import { IPost } from "@/schema/posts.schema"

// components
import PostItem from './PostItem'

interface Props {
  posts: IPost[]
}

const PostGrid: React.FC<Props> = ({ posts }: Props): React.ReactElement => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-4">
    {posts.map((post) => (
      <PostItem key={post.slug} post={post} />
    ))}
  </div>
)

export default PostGrid