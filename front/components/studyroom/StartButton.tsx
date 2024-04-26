import Link from 'next/link'

const StartButton = () => {
  // 문제 풀이 시작하면
  // 1. 문제 풀이 시작 시간을 로컬스토리지에 저장
  // 2. editor로 넘어간다.
  return (
    <div>
      <Link
        href="/editor"
        className="mt-10 border w-80 h-12 rounded-xl flex items-center justify-center bg-darkNavy text-dimmedPurple hover:bg-opacity-80 shadow-foggyPurple duration-300"
      >
        문제 풀이 시작하기
      </Link>
    </div>
  )
}

export default StartButton
