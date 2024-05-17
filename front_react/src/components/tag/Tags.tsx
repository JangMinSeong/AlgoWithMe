import * as React from 'react'
import fetch from '@/lib/fetch.ts'
import toast from 'react-hot-toast'

// 태그 인터페이스
interface Tag {
  key: string
  label: string
}

// 태그 목록
const tags: Tag[] = [
  { key: 'DFS', label: 'DFS' },
  { key: 'BFS', label: 'BFS' },
  { key: 'BRUTEFORCE', label: '브루트포스' },
  { key: 'GREEDY', label: '그리디' },
  { key: 'DP', label: '다이나믹 프로그래밍' },
  { key: 'STRING', label: '문자열' },
  { key: 'BINARY_SEARCH', label: '이분 탐색' },
  { key: 'SIMULATION', label: '구현' },
  { key: 'SORTING', label: '정렬' },
  { key: 'BITMASK', label: '비트 마스킹' },
  { key: 'BACKTRACKING', label: '백트래킹' },
  { key: 'DATA_STRUCTURES', label: '자료구조' },
  { key: 'GRAPH', label: '그래프' },
]

// `TagSelector` 컴포넌트 인터페이스
interface TagSelectorProps {
  selectedTags: string[]
  toggleTag: (key: string) => void
  onClose: () => void
  pageId: number
}

const TagSelector: React.FC<TagSelectorProps> = ({
  selectedTags,
  toggleTag,
  onClose,
  pageId,
}) => {
  const handleSave = async () => {
    const dataToUpdate = {
      pageId: pageId,
      tagList: selectedTags,
    }

    console.log(dataToUpdate)

    await fetch(`/page/tag`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToUpdate),
    })
      .then(() => {
        toast.success('저장했어요')
      })
      .then(() => onClose())
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="modal-content bg-gray-200 p-5 rounded-lg shadow-lg max-w-lg w-full">
        <div className="font-bold text-lg mb-2">현재 선택한 유형 </div>

        <div className="flex flex-wrap pb-1 border-b-2 border-slate-300 mb-4">
          {selectedTags.length === 0 && (
            <div className="text-sm">아직 선택한 유형이 없어요</div>
          )}
          {selectedTags.map((item) => (
            <div className="rounded-xl bg-blueishPurple/20 text-xs flex px-3 items-center justify-center h-6 mr-1 mb-1 ">
              {item}
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <button
              key={tag.label}
              className={`px-4 py-1 text-sm font-semibold rounded-full transition-colors duration-200 ${
                selectedTags.includes(tag.label)
                  ? 'bg-primary text-white border-primary  border-4 hover:bg-primary/80 '
                  : 'border-primary text-primary border-4 hover:bg-primary/80 hover:text-white'
              }`}
              onClick={() => toggleTag(tag.label)}
            >
              {tag.label}
            </button>
          ))}
        </div>
        <div className="flex justify-end">
          <button
            className="border border-red-500 hover:bg-red-500/70 hover:text-white text-red-500 text-xs px-3 h-7 mr-2 mt-11 rounded-xl transition-colors "
            onClick={onClose}
          >
            취소
          </button>
          <button
            className="bg-primary hover:bg-primary/50 text-white text-xs px-3 h-7 mr-2 mt-11 border-b-0 rounded-xl transition-colors "
            onClick={handleSave}
          >
            저장하기
          </button>
        </div>
      </div>
    </div>
  )
}

export default TagSelector
