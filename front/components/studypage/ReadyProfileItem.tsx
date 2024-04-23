import Image from 'next/image'
import { PiLinkSimple } from 'react-icons/pi'
const ReadyProfileItem = ({ idx }: { idx: number }) => {
  const isReady = false
  const memberLength = 2

  return (
    <div>
      {idx === memberLength ? (
        // 접속링크
        <div
          className={` bg-white w-40 h-52 rounded-lg flex flex-col items-center p-4`}
        >
          {/* gradient border */}
          <div className="h-[60%] flex items-center justify-center">
            <PiLinkSimple className="w-[72px] h-[72px] border rounded-full" />
          </div>
          <div className="h-[40%] flex items-center flex-col justify-around">
            <div className="font-bold">접속 링크 복사</div>
          </div>
        </div>
      ) : (
        <div
          className={`${isReady ? 'from-primary/50 via-secondary/50 to-blueishPurple/50' : 'from-primary via-secondary to-blueishPurple'} p-[2px] bg-gradient-to-br w-fit  rounded-lg`}
        >
          <div
            className={`${isReady ? 'bg-opacity-0' : null} bg-white w-40 h-52 rounded-lg flex flex-col items-center p-4`}
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
              {isReady ? (
                <div className="text-sm text-darkNavy">{'준비 완료!'}</div>
              ) : (
                <div className="text-sm text-navy">{'준비 중이에요'}</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ReadyProfileItem
