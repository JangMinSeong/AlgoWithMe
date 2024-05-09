import * as React from 'react'

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
  { key: 'SHORTEST_PATH', label: '최단경로' },
]

// `TagSelector` 컴포넌트 인터페이스
interface TagSelectorProps {
  selectedTags: string[]
  toggleTag: (key: string) => void
  onClose: () => void
}

const TagSelector: React.FC<TagSelectorProps> = ({
  selectedTags,
  toggleTag,
  onClose,
}) => (
  <div className="tag-selector-modal">
    <div className="modal-content">
      {tags.map((tag) => (
        <button
          key={tag.key}
          className={`pt-1 h-8 text-white border border-gray-100 rounded-md p-2 tag-button hover:bg-secondary ${
            selectedTags.includes(tag.key) ? 'bg-primary' : 'bg-navy'
          }`}
          onClick={() => toggleTag(tag.key)}
        >
          {tag.label}
        </button>
      ))}
    </div>
  </div>
)

export default TagSelector
