import { RootState } from '@/lib/store'
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { Tooltip } from 'react-tooltip'
import { IProblemInfo } from '@/features/search/searchSlice'
import Paginator from './Paginator'

const ViewProblems = ({ setParentChosenProblem }) => {
  const [chosenProblem, setChosenProblem] = useState<IProblemInfo>()

  const searchResult = useSelector(
    (state: RootState) => state.search.problemInfoList,
  )

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
      <div className="pr-2">
        {chosenProblem ? (
          <div className="flex mb-1 bg-white h-[60px] items-center px-4 py-4 rounded-lg shadow-foggyBlue hover:bg-dimmedPurple hover:bg-opacity-100 hover:border-opacity-0 transition-colors">
            {/* 이미지, 제목 */}
            <div className="flex w-[60%] items-center">
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
              <div className="truncate w-[80%]">
                {chosenProblem.number}. {chosenProblem.title}
              </div>
            </div>
            {/*  */}

            {/* 레벨, 취소 */}
            <div className="flex w-[40%] justify-end">
              <div className={chipCss}>
                {chosenProblem.provider === 'baekjoon' &&
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
              {/*  */}
            </div>
          </div>
        ) : (
          <div className="h-[60px] flex items-center">
            아직 선택한 문제가 없어요.
          </div>
        )}
      </div>

      <div className="mt-4 ">
        <div className="font-bold mb-4">검색 결과 </div>

        {/* 검색결과조회 */}
        <div className="h-[300px] overflow-y-scroll">
          {searchResult &&
            searchResult.map((el, idx) => (
              <div className="flex mb-1  bg-white h-[60px] items-center pl-4 py-4 rounded-lg border border-blueishPurple border-opacity-30  hover:bg-dimmedPurple hover:bg-opacity-100 hover:border-opacity-0 transition-colors">
                {/* 이미지, 제목 */}
                <div className="flex w-[56%] items-center">
                  <a
                    id="problemLink"
                    target="_blank"
                    href={el.url}
                    rel="noreferrer"
                    aria-label="문제 링크"
                    className=" mr-4"
                  >
                    {' '}
                    <img
                      src={`/${el.provider}.png`}
                      alt="로고"
                      width={20}
                      height={20}
                      className="rounded-full"
                    />{' '}
                  </a>
                  <Tooltip anchorSelect="#problemLink" place="bottom">
                    문제 보러 가기
                  </Tooltip>
                  <div className="truncate w-[80%]">
                    {el.number}. {el.title}
                  </div>
                </div>

                {/* 레벨, 선택 */}
                <div className="flex w-[40%] justify-end">
                  <div className={`${chipCss} `}>
                    {el.provider === 'baekjoon' && el.level !== 'Unrated' && (
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
                    className="w-10 rounded-xl border border-primary text-primary text-xs flex px-2 items-center justify-center h-6 hover:bg-primary hover:text-white transition-colors"
                  >
                    선택
                  </div>
                </div>
              </div>
            ))}
        </div>
        {/* 검색결과조회끝 */}
        <Paginator />
      </div>
    </div>
  )
}

export default ViewProblems
