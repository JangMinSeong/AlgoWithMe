import * as React from 'react'
import { useEffect, useState } from 'react'
import TagSelector from '@/components/tag/Tags'
import toast, { Toaster } from 'react-hot-toast'
import { Tooltip } from 'react-tooltip'

interface LeftHeaderProps {
  title: string
  level: string
  number: number
  provider: string
  activeTab: string
  onSave: () => void
  url: string
  pageId: number
  tags: string[]
}

const LeftHeader: React.FC<LeftHeaderProps> = ({
  title,
  level,
  number,
  provider,
  activeTab,
  onSave,
  url,
  pageId,
  tags,
}) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]) // 선택된 태그를 관리하는 상태
  const [isTagSelectorOpen, setIsTagSelectorOpen] = useState(false)

  useEffect(() => {
    setSelectedTags(tags)
  //  console.log(tags)
  }, [tags])

  const toggleTag = (key: string) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(key)
        ? prevTags.filter((tag) => tag !== key)
        : [...prevTags, key],
    )
  }

  const handleSaveClick = (action: string) => {
    if (action === '저장') {
      onSave() // 저장 버튼 클릭 시 onSave 호출
      toast.success('저장했어요')
    }
  }

  const handleProblemLinkClick = () => {
    window.open(url, '_blank')
  }

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

  return (
    <div className="flex justify-between items-center w-full h-16 border-b-[1px] border-b-blueishPurple">
      <div className="flex items-center ml-10 w-[70%]">
        <img
          src={`/${provider === 'boj' ? 'baekjoon' : provider}.png`}
          width={30}
          height={30}
          className="rounded-full mr-4 hover:cursor-pointer"
          onClick={() => handleProblemLinkClick()}
          data-tooltip-id="pLink"
          data-tooltip-content="원본 문제 보러가기"
        />
        <div className="text-2xl font-bold mr-4  truncate">
          {number}. {title}
        </div>
        <div className="bg-primary flex px-3 items-center justify-center h-7 min-w-12 text-white text-xs">
          {provider === 'boj' && level !== 'Unrated' && (
            <img
              src={`/level/${bojdata[level]}.svg`}
              width={10}
              height={0}
              alt="1"
              className="mr-1"
            />
          )}
          {level}
        </div>
      </div>

      <div className="flex ">
        {activeTab === '개인 메모장' && (
          <button
            className="border border-primary  text-primary hover:bg-primary/70 hover:text-white text-xs px-3 h-7 mr-1 transition-colors"
            onClick={() => handleSaveClick('저장')}
          >
            저장
          </button>
        )}

        <button
          className="bg-primary hover:bg-primary/70 text-white text-xs px-3 min-w-20 h-7 mr-2 transition-colors "
          onClick={() => setIsTagSelectorOpen(!isTagSelectorOpen)}
        >
          문제 유형 설정
        </button>

        {isTagSelectorOpen && (
          <TagSelector
            selectedTags={selectedTags}
            toggleTag={toggleTag}
            onClose={() => setIsTagSelectorOpen(false)}
            pageId={pageId}
          />
        )}
      </div>

      <Tooltip id="pLink" place="right" />
      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  )
}

export default LeftHeader
