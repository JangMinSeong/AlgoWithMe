import PieChart from '@/components/mainpage/PieChart'
import NextProblem from '@/components/problems/NextProblem'
import InviteMember from '@/components/studypage/InviteMember'
import AddProblem from '@/components/problems/AddProblem'
import PrevProblem from '@/components/problems/PrevProblem'
import ActiveProfileItem from '@/components/studypage/ActiveProfileItem'
import SetTimer from '@/components/studypage/SetTimer'
import { useParams } from 'react-router-dom'
import { GoPencil } from 'react-icons/go'
import { Tooltip } from 'react-tooltip'
import { useState } from 'react'
import { RootState } from '@/lib/store'
import { useSelector } from 'react-redux'
import useStudy from '@/hooks/useStudy'

const StudyMainPage = () => {
  const { groupId } = useParams()
  const anchorTagCSS =
    'w-6 h-6 rounded-md flex justify-center items-center hover:bg-darkNavy hover:bg-opacity-20 transition-colors '
  const [isEditingName, setIsEditingName] = useState(false)
  const [isEditingImage, setIsEditingImage] = useState(false)
  const [isShowingImgEditor, setIsShowingImgEditor] = useState(false)
  const { handleEditName, handleEditImage } = useStudy()

  const currentStudyInfo = useSelector((state: RootState) => state.study)

  const reversedCandidates = [...currentStudyInfo.candidateProblems].reverse()

  // 로딩중 적용하기

  const handleEditStudyName = (event) => {
    const formData = new FormData(event.target)
    const newName = formData.get('newName').toString()

    handleEditName(currentStudyInfo.teamId, newName)
    setIsEditingName(false)
  }

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
              {currentStudyInfo.imageUrl ? (
                <img
                  src={currentStudyInfo.imageUrl}
                  alt="img"
                  width={80}
                  height={80}
                  className="mr-2"
                />
              ) : (
                <img
                  src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Symbols/Bubbles.png"
                  alt="Bubbles"
                  width={80}
                  height={80}
                />
              )}
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
              {isEditingName ? (
                <div className="flex items-center bg-white rounded-xl mr-2">
                  <form
                    id="name"
                    onSubmit={handleEditStudyName}
                    className="flex "
                  >
                    <input
                      type="text"
                      name="newName"
                      required
                      maxLength={8}
                      defaultValue={currentStudyInfo.name.replace(/"/gi, '')}
                      placeholder="새로운 스터디 이름"
                      className="text-sm p-2 w-28 rounded-xl "
                    />
                    <div className="flex items-center">
                      <button className="rounded-xl border border-primary text-primary text-xs flex px-2 items-center justify-center h-6 mr-1  hover:bg-primary hover:text-white transition-colors">
                        저장
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          setIsEditingName(false)
                        }}
                        className="rounded-xl border border-red-500 text-red-500 text-xs flex px-2 items-center justify-center h-6 mr-1 hover:bg-red-500 hover:text-white transition-colors"
                      >
                        취소
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="flex items-center">
                  {' '}
                  {currentStudyInfo.name.replace(/"/gi, '')}
                  <a id="editName" className={anchorTagCSS}>
                    <GoPencil
                      className="w-4 opacity-20"
                      onClick={() => setIsEditingName(true)}
                    />
                  </a>
                </div>
              )}

              <div>와 함께한 지</div>
              <div className="text-purple-400 ml-2">
                {currentStudyInfo.joinDay}
              </div>
              <div>일 </div>
            </div>
            <InviteMember groupId={groupId} />
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
              <AddProblem groupId={groupId} />
              {reversedCandidates.map((el) => (
                <NextProblem problemInfo={el} key={el.problemId} />
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
