import { RootState } from '@/lib/store'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { IProblem } from '@/features/problems/problemSlice'
import { Tooltip } from 'react-tooltip'

const ViewProblems = ({ setParentChosenProblem }) => {
  const problemList = useSelector(
    (state: RootState) => state.problems.problemList,
  )
  const [chosenProblem, setChosenProblem] = useState<IProblem>()

  const bojdata = {
    Bronze5: 1,
    Bronze4: 2,
    Bronze3: 3,
    Bronze2: 4,
    Bronze1: 5,
    Silver5: 6,
    Silver4: 7,
    Silver3: 8,
    Silver2: 9,
    Silver1: 10,
    Gold5: 11,
    Gold4: 12,
    Gold3: 13,
    Gold2: 14,
    Gold1: 15,
    Platinum5: 16,
    Platinum4: 17,
    Platinum3: 18,
    Platinum2: 19,
    Platinum1: 20,
    Diamond5: 21,
    Diamond4: 22,
    Diamond3: 23,
    Diamond2: 24,
    Diamond1: 25,
    Ruby5: 26,
    Ruby4: 27,
    Ruby3: 28,
    Ruby2: 29,
    Ruby1: 30,
  }

  const chipCss =
    'bg-primary rounded-xl flex px-3 items-center justify-center h-6 mr-1 text-xs text-white'

  return (
    <div>
      <div className="font-bold mb-4">현재 선택한 문제</div>
      <div className="pr-6">
        {chosenProblem && (
          <div className="flex bg-white h-[60px] items-center px-4 py-4 rounded-lg border border-blueishPurple border-opacity-30 shadow-foggyBlue hover:bg-dimmedPurple hover:bg-opacity-100 hover:border-opacity-0 transition-colors justify-between">
            <a
              id="problemLink"
              target="_blank"
              href={chosenProblem.url}
              rel="noreferrer"
              aria-label="문제 링크"
            >
              {' '}
              <img
                src={`/${chosenProblem.provider}.png`}
                alt="로고"
                width={20}
                height={20}
                className="rounded-full mr-2"
              />{' '}
            </a>
            <Tooltip anchorSelect="#problemLink" place="bottom">
              문제 보러 가기
            </Tooltip>
            <div className="w-[56%]">
              {chosenProblem.number}. {chosenProblem.name}
            </div>

            <div className={chipCss}>
              {chosenProblem.provider === 'BOJ' &&
                chosenProblem.level !== 'Unrated' && (
                  <img
                    src={`/level/${bojdata[chosenProblem.level]}.svg`}
                    width={10}
                    alt="1"
                    className="mr-1"
                  />
                )}
              {chosenProblem.level}
            </div>

            <div
              onClick={() => {
                setChosenProblem(null)
                setParentChosenProblem(null)
              }}
              className="rounded-xl border border-red-500 text-red-500 text-xs flex px-2 items-center justify-center h-6 mr-1 hover:bg-red-500 hover:text-white transition-colors"
            >
              취소
            </div>
          </div>
        )}
      </div>

      <div className="mt-4">
        {/* default는 전체 문제리스트 */}
        <div className="font-bold mb-4">검색 결과 </div>
        <div className="h-[300px] pr-4 overflow-y-scroll">
          {problemList &&
            problemList.slice(0, 6).map((el, idx) => (
              <div className="flex mb-1 bg-white h-[60px] items-center px-4 py-4 rounded-lg border border-blueishPurple border-opacity-30  hover:bg-dimmedPurple hover:bg-opacity-100 hover:border-opacity-0 transition-colors justify-between">
                <a
                  id="problemLink"
                  target="_blank"
                  href={el.url}
                  rel="noreferrer"
                  aria-label="문제 링크"
                >
                  {' '}
                  <img
                    src={`/${el.provider}.png`}
                    alt="로고"
                    width={20}
                    height={20}
                    className="rounded-full mr-4 "
                  />{' '}
                </a>
                <Tooltip anchorSelect="#problemLink" place="bottom">
                  문제 보러 가기
                </Tooltip>
                <div className="w-[50%]">
                  {el.number}. {el.name}
                </div>

                <div className={chipCss}>
                  {el.provider === 'BOJ' && el.level !== 'Unrated' && (
                    <img
                      src={`/level/${bojdata[el.level]}.svg`}
                      width={10}
                      alt="1"
                      className="mr-1"
                    />
                  )}
                  {el.level}
                </div>

                <div
                  onClick={() => {
                    setChosenProblem(el)
                    setParentChosenProblem(el)
                  }}
                  className="rounded-xl border border-primary text-primary text-xs flex px-2 items-center justify-center h-6 mr-1 hover:bg-primary hover:text-white transition-colors"
                >
                  선택
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default ViewProblems
