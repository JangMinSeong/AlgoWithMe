'use client'

import Image from 'next/image'
import PieChart from '@/components/mainpage/PieChart'
import NextProblem from '@/components/problems/NextProblem'
import InviteMember from '@/components/studypage/InviteMember'
import AddProblem from '@/components/problems/AddProblem'
import PrevProblem from '@/components/problems/PrevProblem'
import ActiveProfileItem from '@/components/studyroom/ActiveProfileItem'
import SetTimer from '@/components/studyroom/SetTimer'
import { GoPencil } from 'react-icons/go'
import { Tooltip } from 'react-tooltip'
import { useState, useEffect } from 'react'
import useStudy from '@/hooks/useStudy'
import { RootState } from '@/lib/store'
import { useSelector } from 'react-redux'

const anchorTagCSS =
  'w-6 h-6 rounded-md flex justify-center items-center hover:bg-darkNavy hover:bg-opacity-20 transition-colors '

const StudyMainPage = ({ params }: { params: { teamId: number } }) => {
  const [isEditingName, setIsEditingName] = useState(false)
  const [isEditingImage, setIsEditingImage] = useState(false)
  const [isShowingImgEditor, setIsShowingImgEditor] = useState(false)
  const { handleFetchStudyInfo } = useStudy()

  useEffect(() => {
    console.log(params.teamId)
    handleFetchStudyInfo(params.teamId)
  }, [params.teamId]) // 이렇게 받는게.. 맞나

  const currentStudyInfo = useSelector((state: RootState) => state.study)

  return (
    <div className="flex flex-col">
      {/* 위 */}
      <div className=" flex flex-wrap">
        {/* 왼쪽 위 */}
        <div className=" w-[50%] mb-10 flex flex-col ">
          {/* 스터디 소개 */}
          <div className="mr-4  font-bold flex justify-between items-center h-[28%] mb-4 rounded-2xl p-2 ">
            <span
              className="relative"
              onMouseEnter={() => setIsShowingImgEditor(true)}
              onMouseLeave={() => setIsShowingImgEditor(false)}
            >
              <Image
                src={currentStudyInfo.imageUrl}
                alt="Bubbles"
                width={80}
                height={80}
                className="mr-2"
              />
              <a
                id="editImage"
                href="a"
                className={`${anchorTagCSS} absolute right-0 bottom-0`}
              >
                {isShowingImgEditor && (
                  <GoPencil
                    className="w-4 opacity-20"
                    onClick={() => setIsEditingImage(true)}
                  />
                )}
              </a>
            </span>
            <div className="flex text-2xl mb-2 mr-2">
              <div className="flex items-center">
                {currentStudyInfo.name}
                <a id="editName" className={anchorTagCSS}>
                  <GoPencil
                    className="w-4 opacity-20"
                    onClick={() => setIsEditingName(true)}
                  />
                </a>
              </div>
              <div>와 함께한 지</div>
              <div className="text-purple-400 ml-2">
                {currentStudyInfo.joinDay}
              </div>
              <div>일 </div>
            </div>
            <InviteMember teamId={params.teamId} />
          </div>
          {/* 멤버랭킹 */}
          <div className="mr-4 flex flex-col h-[72%]">
            <div className="font-bold mb-4 ">멤버 랭킹</div>
            {currentStudyInfo.ranking.map((el, idx) => (
              <ActiveProfileItem key={el.id} person={el} rank={idx} />
            ))}
          </div>
        </div>

        {/* 오른쪽 위 파이차트 */}
        <div className="w-[50%] mb-10 flex flex-col mx-auto">
          <div className="font-bold mb-4">스터디에서 진행한 알고리즘 통계</div>
          <div className="flex items-center justify-center h-80 ">
            <PieChart chartList={currentStudyInfo.chart} />
          </div>
        </div>
      </div>

      {/* 아래 */}
      <div className="flex flex-wrap">
        <div className="mb-10 flex grow">
          <div className="w-[34%] grow mb-10 flex flex-col">
            <div className="font-bold mb-4 mt-4">문제 풀이 시간 설정</div>
            <div className="flex ">
              <SetTimer />
            </div>
          </div>

          <div className="w-[33%] grow mb-10 flex flex-col">
            <div className="font-bold mb-4 mt-4">함께 풀어 볼 문제</div>
            <div className="pr-10">
              <AddProblem groupId={params.teamId} />
              {currentStudyInfo.candidateProblems.map((el) => (
                <NextProblem problemInfo={el} key={el.id} />
              ))}
            </div>
          </div>

          <div className="w-[33%] grow mb-10 flex flex-col">
            <div className="font-bold mb-4 mt-4">지난 스터디 복습하기</div>
            <div className="pr-10">
              {currentStudyInfo.solvedProblems.map((el) => (
                <PrevProblem key={el.pageId} problemPageInfo={el} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Tooltip anchorSelect="#editName" place="bottom">
        스터디 이름 수정
      </Tooltip>
      <Tooltip anchorSelect="#editImage" place="right">
        대표 이미지 수정
      </Tooltip>
    </div>
  )
}
export default StudyMainPage
