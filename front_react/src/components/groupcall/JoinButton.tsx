import { useState } from 'react'
import { ImPhoneHangUp } from 'react-icons/im'
import { PiPhoneSlashFill } from 'react-icons/pi'
import { Tooltip } from 'react-tooltip'

interface IJoinButtonProps {
  joinSession: () => void
  outSession: () => void
  isInSession
  setParentIsInSession
}

const JoinButton = (props: IJoinButtonProps) => {
  // const [isInSession, setIsInsession] = useState(false)
  const handleJoin = () => {
    props.joinSession()
    props.setParentIsInSession(true)
  }

  const handleQuit = () => {
    props.outSession()
    props.setParentIsInSession(false)
  }
  return (
    <div>
      {props.isInSession ? (
        <div>
          <a
            id="quitCall"
            onClick={handleQuit}
            className="rounded-full w-10 h-10 border border-red-500 text-red-500 text-xs flex px-2 items-center justify-center mr-1 hover:bg-red-500 hover:text-white transition-colors"
          >
            <PiPhoneSlashFill className="w-5 h-5" />
          </a>
          <Tooltip anchorSelect="#quitCall" place="top">
            음성채팅 퇴장하기
          </Tooltip>
        </div>
      ) : (
        <div>
          <a
            onClick={handleJoin}
            className="rounded-full w-10 h-10 border border-primary text-primary text-xs flex px-2 items-center justify-center  mr-1  hover:bg-primary hover:text-white transition-colors"
            id="connectCall"
          >
            <ImPhoneHangUp className="w-5 h-5" />
          </a>
          <Tooltip anchorSelect="#connectCall" place="top">
            음성채팅 입장하기
          </Tooltip>
        </div>
      )}
    </div>
  )
}

export default JoinButton
