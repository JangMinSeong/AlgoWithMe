'use client'
import { PiLinkSimple } from 'react-icons/pi'
import toast, { Toaster } from 'react-hot-toast'

const CopyRoomLink = () => {
  const handleCopyLink = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast.success('링크가 복사되었어요')
      console.log(text)
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div className={`p-[2px] w-fit rounded-2xl bg-background`}>
      <div
        className={` bg-white w-40 h-52 rounded-2xl flex flex-col items-center p-4`}
      >
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
      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  )
}

export default CopyRoomLink
