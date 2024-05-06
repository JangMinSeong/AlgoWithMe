import { RootState } from '@/lib/store'
import { useSelector } from 'react-redux'
import useLevels from '@/hooks/useLevels'

const TempSelected = () => {
  const { handleDeleteSelected } = useLevels()
  const selected = useSelector((state: RootState) => state.levels.selected)
  const chipCss =
    'rounded-xl bg-slate-200 text-xs flex pl-3 items-center justify-center h-6 mr-1 mb-1'
  return (
    <div className="flex items-center flex-wrap">
      {selected.map((item) => (
        <div className={chipCss}>
          {item}
          <span
            className="p-1 mx-1 hover:bg-slate-500/20 transition-colors rounded-lg"
            onClick={() => {
              handleDeleteSelected(item)
            }}
          >
            ⨯
          </span>
        </div>
      ))}
      {selected.length > 0 && (
        <div className="flex">
          <div className="rounded-xl border border-primary text-primary text-xs flex px-3 items-center justify-center h-6 mr-1 mb-1 hover:bg-primary hover:text-white transition-colors">
            찾기
          </div>
        </div>
      )}
    </div>
  )
}

export default TempSelected
