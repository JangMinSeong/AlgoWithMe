import { RootState } from '@/lib/store'
import { useSelector } from 'react-redux'
import useCode from "@/hooks/useCode.ts";

interface UserInfo {
    id:number
    nickname:string
    imageUrl:string
}


const Avatar = ( props : { userInfo: UserInfo, isProfile:boolean }) => {
  //const userImage = useSelector((state: RootState) => state.auth.user.imageUrl)
    const {handleCurUserId} = useCode()
    const curUser =  useSelector((state: RootState) => state.code.curUserId)
    const handleClickEvent = () => {
        handleCurUserId(props.userInfo.id)
    }

  return (
    <div className={`${curUser === props.userInfo.id && !props.isProfile ? "border border-red-500 rounded-full" : ""}`}>
      <img
        src={props.userInfo.imageUrl}
        alt="프로필"
        width={30}
        height={0}
        className="rounded-full"
        onClick={handleClickEvent}
      />
    </div>
  )
}

export default Avatar
