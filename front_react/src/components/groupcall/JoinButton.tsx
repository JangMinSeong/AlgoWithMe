import { useState } from 'react'
interface IJoinButtonProps {
  joinSession: () => void
  outSession: () => void
}

const JoinButton = (props: IJoinButtonProps) => {
  const [isInSession, setIsInsession] = useState(false)
  const handleJoin = () => {
    props.joinSession()
    setIsInsession(true)
  }

  const handleQuit = () => {
    props.outSession()
    setIsInsession(false)
  }
  return (
    <div>
      {isInSession ? (
        <button
          onClick={handleQuit}
          className="rounded-xl border border-red-500 text-red-500 text-xs flex px-2 items-center justify-center h-6 mr-1 hover:bg-red-500 hover:text-white transition-colors"
        >
          음성채팅 퇴장하기
        </button>
      ) : (
        <button
          onClick={handleJoin}
          className="rounded-xl border border-primary text-primary text-xs flex px-2 items-center justify-center h-6 mr-1  hover:bg-primary hover:text-white transition-colors"
        >
          음성채팅 입장하기
        </button>
      )}
    </div>
  )
}

export default JoinButton
