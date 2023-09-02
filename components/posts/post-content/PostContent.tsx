/* eslint-disable react/no-children-prop */
import Image from "next/image"
import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'

// schema
import { IPost } from "@/schema/posts.schema"

// utils
import { formatDate } from "@/utils/system.util"

// styles
import styles from './PostContent.module.scss'

interface Props {
  post: IPost
}

const PostContent: React.FC<Props> = (
  { post: { title, content, slug, author, image, createdAt } }: Props): React.ReactElement => {

  const customRenderers = {
    code({node, inline, className, children, ...props}: Record<string, string>) {
        const match = /language-(\w+)/.exec(className || '')
        return !inline && match ? (
          <SyntaxHighlighter
            {...props}
            children={String(children).replace(/\n$/, '')}
            style={atomDark}
            language={match[1]}
            PreTag="div"
          />
        ) : (
          <code {...props} className={className}>
            {children}
          </code>
        )
      }
  }

  return (
    <section>
      <header className={styles.header}>
        {image && <Image src={image} alt={slug} width={400} height={200} />}
        <div>
          <h1>{title}</h1>
          <i>Author: <b>{author}</b></i>
          <i><b>{formatDate(createdAt)}</b></i>
        </div>
      </header>
    <div className={styles.markdownContainer}>
      <ReactMarkdown components={customRenderers}>
        {content}
      </ReactMarkdown>
    </div>
    </section>
  )
}

export default PostContent