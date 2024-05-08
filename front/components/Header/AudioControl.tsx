import { FiMic, FiMicOff } from 'react-icons/fi'
import { TbHeadphones, TbHeadphonesOff } from 'react-icons/tb'
import { Tooltip } from '@/components/ReactToolTip'

const AudioControl = () => {
  const anchorTagCSS =
    'w-6 h-6 mr-2 rounded-md flex justify-center items-center hover:bg-darkNavy hover:bg-opacity-20 transition-colors'
  return (
    <div className="ml-2 bg-white bg-opacity-20 border border-accent border-opacity-50 flex pl-2 py-2 w-fit rounded-3xl shadow-foggyPurple">
      {isMicOn ? (
        <div onClick={() => handleMicOff(myPublisher)}>
          <a id="willOffMic" className={anchorTagCSS}>
            <FiMic className="w-5 h-5" />
          </a>
          <Tooltip anchorSelect="#willOffMic" place="bottom">
            마이크 끄기
          </Tooltip>
        </div>
      ) : (
        <div onClick={() => handleMicOn(myPublisher)}>
          <a id="willOnMic" className={anchorTagCSS}>
            <FiMicOff className="w-5 h-5 text-red-400" />
          </a>
          <Tooltip anchorSelect="#willOnMic" place="bottom">
            마이크 켜기
          </Tooltip>
        </div>
      )}

      {isHeadphoneOn ? (
        <div onClick={() => handleHeadphoneOff(mySubscriber)}>
          <a id="willOffHeadphone" className={anchorTagCSS}>
            <TbHeadphones className="w-5 h-5" />
          </a>
          <Tooltip anchorSelect="#willOffHeadphone" place="bottom">
            헤드셋 소리 끄기
          </Tooltip>
        </div>
      ) : (
        <div onClick={() => handleHeadphoneOn(mySubscriber)}>
          <a id="willOnHeadphone" className={anchorTagCSS}>
            <TbHeadphonesOff className="w-5 h-5 text-red-400" />
          </a>
          <Tooltip anchorSelect="#willOnHeadphone" place="bottom">
            헤드셋 소리 켜기
          </Tooltip>
        </div>
      )}
    </div>
  )
}

export default AudioControl
