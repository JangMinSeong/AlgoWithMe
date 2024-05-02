import { FiMic } from 'react-icons/fi'
import { FiMicOff } from 'react-icons/fi'
import { TbHeadphones } from 'react-icons/tb'
import { TbHeadphonesOff } from 'react-icons/tb'
import { Tooltip } from 'react-tooltip'
import useGroupCall from '@/hooks/useGroupCall'
import { useSelector } from 'react-redux'
import { RootState } from '@/lib/store'

const AudioControl = () => {
  const { handleMicOn, handleMicOff, handleHeadphoneOn, handleHeadphoneOff } =
    useGroupCall()

  const isMicOn = useSelector((state: RootState) => state.groupcall.isMicOn)
  const isHeadphoneOn = useSelector(
    (state: RootState) => state.groupcall.isHeadphoneOn,
  )

  const anchorTagCSS =
    'w-6 h-6 mr-2 rounded-md flex justify-center items-center hover:bg-darkNavy hover:bg-opacity-20 transition-colors'
  return (
    <div className="ml-2 bg-white bg-opacity-20 border border-accent border-opacity-50 flex pl-2 py-2 w-fit rounded-3xl shadow-foggyPurple">
      {isMicOn ? (
        <div onClick={() => handleMicOff()}>
          <a id="willOffMic" className={anchorTagCSS}>
            <FiMic className="w-5 h-5" />
          </a>
          <Tooltip anchorSelect="#willOffMic" place="bottom">
            마이크 끄기
          </Tooltip>
        </div>
      ) : (
        <div onClick={() => handleMicOn()}>
          <a id="willOnMic" className={anchorTagCSS}>
            <FiMicOff className="w-5 h-5 text-red-400" />
          </a>
          <Tooltip anchorSelect="#willOnMic" place="bottom">
            마이크 켜기
          </Tooltip>
        </div>
      )}

      {isHeadphoneOn ? (
        <div onClick={() => handleHeadphoneOff}>
          {' '}
          <a id="willOffHeadphone" className={anchorTagCSS}>
            <TbHeadphones className="w-5 h-5" />
          </a>
          <Tooltip anchorSelect="#willOffHeadphone" place="bottom">
            헤드셋 소리 끄기
          </Tooltip>
        </div>
      ) : (
        <div onClick={() => handleHeadphoneOn()}>
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
