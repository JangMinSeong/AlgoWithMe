import * as React from 'react'
import fetch from "@/lib/fetch.ts";

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
    pageId:number
}

const TagSelector: React.FC<TagSelectorProps> = ({
                                                     selectedTags,
                                                     toggleTag,
                                                     onClose,
                                                        pageId
                                                 }) => {
    const handleSave = async () => {
        const dataToUpdate = {
            pageId:pageId,
            tagList:selectedTags
        }

        console.log(dataToUpdate)

        await fetch(`/page/tag`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(dataToUpdate)
        }).then(()=> {
            onClose()
        })
    }

    return(
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="modal-content bg-gray-200 p-5 rounded-lg shadow-lg max-w-lg w-full">
                <div className="flex flex-wrap justify-start gap-2">
                    {tags.map((tag) => (
                        <button
                            key={tag.label}
                            className={`px-4 py-1 text-sm text-center font-medium rounded-md shadow transition-colors duration-200 ${
                                selectedTags.includes(tag.label) ? 'bg-primary text-white' : 'bg-navy hover:bg-secondary hover:text-white'
                            }`}
                            onClick={() => toggleTag(tag.label)}
                            style={{minWidth: '5rem'}}
                        >
                            {tag.label}
                        </button>
                    ))}
                </div>
                <div className="flex flex-row justify-end text-right mt-4">
                    <button
                        className="py-1 px-4 mr-2 bg-primary text-white rounded hover:bg-secondary transition duration-200"
                        onClick={handleSave}
                    >
                        저장
                    </button>
                    <button
                        className="py-1 px-4 bg-navy text-white rounded hover:bg-secondary transition duration-200"
                        onClick={onClose}
                    >
                        닫기
                    </button>
                </div>
            </div>
        </div>

    );
}

export default TagSelector;
