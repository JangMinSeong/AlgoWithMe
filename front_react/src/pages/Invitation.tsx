import { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Link,
  useParams,
  useSearchParams,
  useNavigate,
} from 'react-router-dom'
import fetch from '@/lib/fetch'
import useStudy from '@/hooks/useStudy'
import { RootState } from '@/lib/store'
import { useSelector } from 'react-redux'

const InvitationPage = () => {
  const { groupId } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const code = searchParams.get('code')

  const { handleFetchStudyInfo } = useStudy()
  const currentStudyName = useSelector((state: RootState) => state.study.name)
  const isLoggedIn = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  )

  useEffect(() => {
    if (isLoggedIn) {
      handleFetchStudyInfo(Number(groupId))
    } else {
      navigate('/welcome')
    }
  }, [])

  const handleJoinGroup = async () => {
    await fetch(`/study/member?encrypted=${code}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(() => navigate(`/${groupId}/study`))
      .catch((err) => console.error(err))
  }

  return (
    <div>
      {currentStudyName}그룹에 초대받았어요! 수락하시겠어요?
      <Link to="/main">아니요</Link>
      <button onClick={handleJoinGroup}>네</button>
    </div>
  )
}

export default InvitationPage
