'use client'
import Image from 'next/image'
import { PiLinkSimple } from 'react-icons/pi'
const ReadyProfileItem = ({ idx }: { idx: number }) => {
  const isReady = false
  const memberLength = 2

  const handleCopyLink = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      alert('링크가 복사되었어요')
      console.log(text)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      {idx === memberLength ? (
        <div className={`p-[2px] w-fit rounded-lg`}>
          <div
            className={` bg-white w-40 h-52 rounded-lg flex flex-col items-center p-4`}
          >
            {/* gradient border */}
            <div className="h-[60%] flex items-center justify-center">
              <div
                onClick={() => handleCopyLink(window.location.href)}
                className="rounded-full border p-5 bg-background"
              >
                <PiLinkSimple className="w-[32px] h-[32px]" />
              </div>
            </div>
            <div className="h-[40%] flex items-center flex-col justify-around">
              <div className="font-bold text-sm">접속 링크 복사하기</div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={`${isReady ? 'from-primary/50 via-secondary/50 to-blueishPurple/50' : 'from-primary via-secondary to-blueishPurple'} p-[2px] bg-gradient-to-br w-fit rounded-lg mr-2`}
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
