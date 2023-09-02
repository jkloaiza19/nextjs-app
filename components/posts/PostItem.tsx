import Image from "next/image"
import Link from "next/link"

// schema
import { IPost } from "@/schema/posts.schema"

// utils
import { formatDate, formatImageUrl } from "@/utils/system.util"

interface Props {
  post: IPost
}

const PostItem: React.FC<Props> = ({ post: { title, excerpt, slug, author, image, createdAt } }: Props): React.ReactElement => (
  <div className="card w-64 md:w-80 lg:w-96 bg-base-100 shadow-xl my-4">
    {image && (
      <figure>
        <Image src={image} alt={slug} width={400} height={200} />
      </figure>
    )}
    <div className="card-body">
      <h2 className="card-title">{title}</h2>
      <h3>Author: <i>{author}</i></h3>
      <h4><i>{formatDate(createdAt)}</i></h4>
      <p>{excerpt}</p>
      <div className="card-actions justify-end">
        <Link href={`/posts/${slug}`} className="btn btn-ghost">See post</Link>
      </div>
    </div>
  </div>
)

export default PostItem