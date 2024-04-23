const ReadyButton = () => {
  const readyState = 'amReady'
  const allMembersReady = false
  return (
    <div>
      {allMembersReady ? (
        <div>스터디 시작하기</div>
      ) : (
        <div>
          {readyState === 'amReady' ? (
            <div>준비 완료했어요</div>
          ) : (
            <div>준비가 덜 됐어요</div>
          )}
        </div>
      )}
    </div>
  )
}

export default ReadyButton
