// schema
import type { Props, Context } from '@/schema/page.schema'

export const getServerSideProps = async ({ params }: Context) => {
  const { uid: userId } = params

  return {
    props: {
      userId,
    },
  }
}

const UserIdPage = ({ userId }: Props) => {
  return (
    <div>
      <h1>Welcome: user-{userId}</h1>
    </div>
  )
}

export default UserIdPage