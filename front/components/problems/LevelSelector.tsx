import Image from 'next/image'
const LevelSelector = () => {
  const sweadata = ['D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8']
  const programmersdata = ['Lv.1', 'Lv.2', 'Lv.3', 'Lv.4', 'Lv.5']
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
    'bg-primary rounded-xl flex px-3 items-center justify-center h-6 mr-1 mb-1'
  return (
    <div>
      <div className="font-bold text-sm">SWEA</div>
      <div className="flex">
        {sweadata.map((lv) => (
          <div className={chipCss} key={lv}>
            <div className="text-white text-xs">{`${lv}`}</div>
          </div>
        ))}
      </div>

      <div className="font-bold text-sm">PROGRAMMERS</div>
      <div className="flex">
        {programmersdata.map((lv) => (
          <div className={chipCss} key={lv}>
            <div className="text-white text-xs">{`${lv}`}</div>
          </div>
        ))}
      </div>

      <div className="font-bold text-sm">BAEKJOON</div>
      <div className="flex flex-wrap">
        {bojdata.map((lv, idx) => (
          <div className={`${chipCss} `} key={lv}>
            <Image
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
