import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import fetch from '@/lib/fetch'
import { RootState } from '@/lib/store'
import { useSelector } from 'react-redux'
import { useWebSocket } from '@/hooks/useWebSocket.ts'
import toast, { Toaster } from 'react-hot-toast'

const InvitationPage = () => {
  const { groupId } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const code = searchParams.get('code')
  const [dataLoaded, setDataLoaded] = useState(false)
  const { connectToServer, disconnectToServer } = useWebSocket()

  const [studyName, setStudyName] = useState('')
  const [studyImage, setStudyImage] = useState(
    'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Symbols/Bubbles.png',
  )

  const isLoggedIn = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  )

  useEffect(() => {
    if (isLoggedIn) {
      connectToServer(Number(groupId))
      const getStudyInfo = async () => {
        await fetch(`/study/invitation/${groupId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((res) => res.json())
          .then((json) => {
            setStudyName(json.name)
            setStudyImage(json.imageUrl)
          })
      }
      getStudyInfo().then(() => setDataLoaded(true))
    } else {
      navigate('/welcome')
    }
    return disconnectToServer
  }, [])

  const handleJoinGroup = async () => {
    await fetch(`/study/member?encrypted=${code}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(() => {
        navigate(`/${groupId}/study`, {
          state: { isInvite: true },
          replace: true,
        })
      })
      .catch((err) => {
        toast.error('유효하지 않은 초대코드예요.')
  //      console.error(err)
      })
  }

  return (
    isLoggedIn &&
    dataLoaded && (
      <div className="h-screen flex items-center justify-center ">
        <div className="flex flex-col items-center justify-center p-6 bg-white shadow-lg rounded-lg mx-auto w-[30%] ">
          <img
            src={studyImage}
            width={140}
            height={140}
            alt="스터디이미지"
            className="rounded-full mb-4"
          />
          <h2 className=" text-gray-800 mb-8 flex items-center flex-col">
            <div className="text-3xl font-bold mb-4">
              {studyName.replace(/"/gi, '')}
            </div>
            <div className="text-lg  font-semibold">그룹에 초대받았어요!</div>
          </h2>
          <p className="text-gray-600 mb-6">이 그룹에 가입하시겠어요?</p>
          <div className="flex gap-4">
            <Link
              to="/main"
              className="w-20 px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition duration-150 text-center"
            >
              아니요
            </Link>
            <button
              onClick={handleJoinGroup}
              className="w-20 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-150 text-center"
            >
              네
            </button>
          </div>
        </div>
        <Toaster position="bottom-center" />
      </div>
    )
  )
}

export default InvitationPage
