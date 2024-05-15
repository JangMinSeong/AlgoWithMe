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
        <button onClick={handleQuit}>퇴장하기</button>
      ) : (
        <button onClick={handleJoin}>입장하기</button>
      )}
    </div>
  )
}

export default JoinButton
