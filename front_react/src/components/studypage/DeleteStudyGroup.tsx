import toast, { Toaster } from 'react-hot-toast'
import fetch from '@/lib/fetch'
import { MdDeleteForever } from 'react-icons/md'
import { useNavigate } from 'react-router'

const DeleteStudyGroup = ({
  groupId,
  isManager,
}: {
  groupId: string
  isManager: boolean
}) => {
  const navigate = useNavigate()
  const handleDeleteStudyGroup = async () => {
    if (confirm('모든 멤버에게서 삭제돼요. 삭제하시겠어요?')) {
      await fetch(`/study/${groupId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })
        .then(() => navigate('/main'))

        .catch(() =>
          toast.error('삭제에 실패했어요. 잠시후 다시 시도해주세요.'),
        )
    }
  }

  const handleQuitStudyGroup = async () => {
    if (confirm('정말로 탈퇴하시겠어요?')) {
      await fetch(`/study/withdrawal/${groupId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })
        .then(() => navigate('/main'))
        .catch(() =>
          toast.error('탈퇴에 실패했어요. 잠시후 다시 시도해주세요.'),
        )
    }
  }

  return (
    <div className=" flex min-w-32 pr-2 py-2 rounded-xl border text-sm text-red-500 shadow-foggyBlue border-opacity-30 mb-2 items-center hover:bg-red-500/60 hover:text-white transition-colors">
      <MdDeleteForever className="w-6 h-6 mx-2" />
      {isManager ? (
        <div
          onClick={handleDeleteStudyGroup}
          className="w-full flex justify-center"
        >
          그룹 삭제하기
        </div>
      ) : (
        <div
          onClick={handleQuitStudyGroup}
          className="w-full flex justify-center"
        >
          그룹 탈퇴하기
        </div>
      )}
      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  )
}

export default DeleteStudyGroup
