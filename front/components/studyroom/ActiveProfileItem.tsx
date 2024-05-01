'use client'
import Image from 'next/image'
const ActiveProfileItem = () => {
  const isSolving = false // 문제풀이중이면.

  return (
    <div>
      <div
        className={`${isSolving ? 'from-primary/50 via-secondary/50 to-blueishPurple/50' : 'from-primary/50 via-secondary/50 to-blueishPurple/50'} p-[2px] bg-gradient-to-br w-fit rounded-2xl mr-2 shadow-foggyBlue`}
      >
        <div
          className={`${isSolving ? 'bg-opacity-0' : null} bg-white w-40 h-52 rounded-2xl flex flex-col items-center p-4`}
        >
          {/* gradient border */}
          <div className="h-[60%] flex items-center justify-center">
            <Image
              src={'/bojlogo.png'}
              alt={'프사'}
              width={72}
              height={72}
              className="border rounded-full"
            />
          </div>
          <div className="h-[40%] flex items-center flex-col justify-around">
            <div className="font-bold">{'김지연'}</div>
            {isSolving ? (
              <div className="text-xs text-darkNavy">
                {'문제를 풀고 있어요'}
              </div>
            ) : (
              <div className="text-xs text-navy">{'준비 중이에요'}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ActiveProfileItem
