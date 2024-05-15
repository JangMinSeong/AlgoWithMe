interface IJoinButtonProps {
  joinSession: () => void
  sessionId: string
}

const JoinButton = (props: IJoinButtonProps) => {
  const handleOnClick = () => {
    props.joinSession()
  }
  return <button onClick={handleOnClick}>참여하기</button>
}

export default JoinButton
