import { IProblemInfo } from '@/features/study/studyTypes'
import { Tooltip } from 'react-tooltip'
import useStudy from '@/hooks/useStudy'
import useSidebar from '@/hooks/useSidebar.ts'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '@/lib/store'
import fetch from '@/lib/fetch.ts'

interface Page {
  pageId: number
  title: string
  docs: boolean
  children: Page[]
}

const NextProblem: React.FC = ({
  problemInfo,
}: {
  problemInfo: IProblemInfo
}) => {
  const { handleDeleteCandidateProblem } = useStudy()
  const navigate = useNavigate()
  const { groupId } = useParams()

  const pPageId = useSelector((state: RootState) => state.sidebar.pageId)
  const pageList = useSelector((state: RootState) => state.sidebar.pageList)

  const { setPages } = useSidebar()

  const handleAddProblem = async () => {
    const dataToCreate = {
      teamId: groupId,
      pageId: pPageId === 0 ? -1 : pPageId,
      problemId: problemInfo.problemId,
    }
    console.log(dataToCreate)
    const response = await fetch('/page/problem', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToCreate),
    })
    const responseData = await response.json()
    const newPage = {
      pageId: responseData.pageId,
      title: responseData.title,
      provider: problemInfo.provider,
      docs: false,
      children: [],
    }

    const addSubPage = (
      pages: Page[],
      parentPageId: number,
      newPage: Page,
    ): Page[] =>
      pages.map((page) => {
        if (page.pageId === parentPageId) {
          return { ...page, children: [...page.children, newPage] }
        }

        return {
          ...page,
          children: addSubPage(page.children, parentPageId, newPage),
        }
      })

    if (pPageId === -1) {
      const updatedList = [...pageList, newPage]
      setPages(updatedList)
    } else {
      const updatedList = addSubPage(pageList, pPageId, newPage)
      setPages(updatedList)
      console.log(updatedList)
    }
    handleDeleteCandidateProblem(problemInfo.candidateId)
    navigate(`/${groupId}/editor/${responseData.pageId}`)
  }
  return (
    <div className={`w-full flex  rounded-lg mb-2`}>
      <div className="flex grow bg-white h-[72px] items-center px-4 py-4 rounded-lg border border-blueishPurple border-opacity-30 shadow-foggyBlue hover:bg-dimmedPurple hover:bg-opacity-100 hover:border-opacity-0 transition-colors justify-between">
        <a
          id="problemLink"
          target="_blank"
          href={problemInfo.url}
          rel="noreferrer"
          aria-label="문제 링크"
        >
          {' '}
          <img
            // src="/swea.png"
            src={`/${problemInfo.provider}.png`}
            alt="로고"
            width={20}
            height={20}
            className="rounded-full mr-4 "
          />{' '}
        </a>
        <Tooltip anchorSelect="#problemLink" place="bottom">
          문제 보러 가기
        </Tooltip>
        <div
          className="w-[56%]"
          data-tooltip-id="nextProb"
          data-tooltip-content={problemInfo.name}
        >
          {problemInfo.number}.{' '}
          {problemInfo.name.length >= 11
            ? `${problemInfo.name.slice(0, 11)} ...`
            : problemInfo.name}
        </div>

        <div
          onClick={handleAddProblem}
          className="rounded-xl border border-primary text-primary text-xs flex px-2 items-center justify-center h-6 mr-1  hover:bg-primary hover:text-white transition-colors"
        >
          문제풀기
        </div>
        <div
          onClick={() => handleDeleteCandidateProblem(problemInfo.candidateId)}
          className="rounded-xl border border-red-500 text-red-500 text-xs flex px-2 items-center justify-center h-6 mr-1 hover:bg-red-500 hover:text-white transition-colors"
        >
          삭제
        </div>
      </div>
      <Tooltip id="nextProb" place="bottom" />
    </div>
  )
}

export default NextProblem
