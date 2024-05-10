import { RootState } from '@/lib/store'
import { useSelector } from 'react-redux'

const Avatar = () => {
  const userImage = useSelector((state: RootState) => state.auth.user.imageUrl)

  return (
    <div>
      <img
        src={userImage}
        alt="프로필"
        width={30}
        height={0}
        className="rounded-full"
      />
    </div>
  )
}

export default Avatar
