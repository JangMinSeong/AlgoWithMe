import useLevels from '@/hooks/useLevels'
import { RootState } from '@/lib/store'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'

const LevelSelector = () => {
  const { handleAddSelected, handleDeleteSelected } = useLevels()

  const selected = useSelector((state: RootState) => state.levels.selected)

  const handleToggleSelection = (item: string) => {
    if (selected.includes(item)) handleDeleteSelected(item)
    else {
      if (selected.length < 5) handleAddSelected(item)
      else toast.error('5개 이하로 선택해주세요')
    }
  }

  const sweadata = ['D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8']
  const programmersdata = ['Lv.0', 'Lv.1', 'Lv.2', 'Lv.3', 'Lv.4', 'Lv.5']
  const bojdata = [
    'Bronze5',
    'Bronze4',
    'Bronze3',
    'Bronze2',
    'Bronze1',
    'Silver5',
    'Silver4',
    'Silver3',
    'Silver2',
    'Silver1',
    'Gold5',
    'Gold4',
    'Gold3',
    'Gold2',
    'Gold1',
    'Platinum5',
    'Platinum4',
    'Platinum3',
    'Platinum2',
    'Platinum1',
    'Diamond5',
    'Diamond4',
    'Diamond3',
    'Diamond2',
    'Diamond1',
    'Ruby5',
    'Ruby4',
    'Ruby3',
    'Ruby2',
    'Ruby1',
  ]

  const chipCss =
    'bg-primary rounded-xl flex px-3 items-center justify-center h-6 mr-1 mb-1 hover:bg-primary/70 transition-colors'
  return (
    <div className="rounded-xl bg-slate-200 px-3 py-2 my-1">
      <div className="font-bold text-sm mb-1">SWEA</div>
      <div className="flex mb-1">
        {sweadata.map((lv) => (
          <div
            className={chipCss}
            key={lv}
            onClick={() => {
              handleToggleSelection(lv)
            }}
          >
            <div className="text-white text-xs">{`${lv}`}</div>
          </div>
        ))}
      </div>

      <div className="font-bold text-sm mb-1">PROGRAMMERS</div>
      <div className="flex  mb-1">
        {programmersdata.map((lv) => (
          <div
            className={chipCss}
            key={lv}
            onClick={() => {
              handleToggleSelection(lv)
            }}
          >
            <div className="text-white text-xs">{`${lv}`}</div>
          </div>
        ))}
      </div>

      <div className="font-bold text-sm mb-1">BAEKJOON</div>
      <div className="flex flex-wrap">
        {bojdata.map((lv, idx) => (
          <div
            className={chipCss}
            key={lv}
            onClick={() => {
              handleToggleSelection(lv)
            }}
          >
            <img
              src={`/level/${idx + 1}.svg`}
              width={10}
              height={0}
              alt="1"
              className="mr-1"
            />
            <div className="text-white text-xs">{`${lv}`}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LevelSelector
