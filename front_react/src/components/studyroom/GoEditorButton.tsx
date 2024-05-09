import { BrowserRouter as Router, Link } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { RootState } from '@/lib/store'

const GoEditorButton = () => {
  const isSolving = useSelector((state: RootState) => state.solving.isSolving)

  return (
    <div>
      {isSolving ? (
        <Link
          to="/editor"
          className="mt-10 border w-80 h-12 rounded-xl flex items-center justify-center bg-primary text-white hover:bg-opacity-80 shadow-foggyPurple duration-300"
        >
          문제 계속 풀러 가기
        </Link>
      ) : (
        <Link
          to="/editor"
          className="mt-10 border w-80 h-12 rounded-xl flex items-center justify-center bg-darkNavy text-dimmedPurple hover:bg-opacity-80 shadow-foggyPurple duration-300"
        >
          문제 풀러 가기
        </Link>
      )}
    </div>
  )
}

export default GoEditorButton
