'use client'
import { FiMic } from 'react-icons/fi'
import { FiMicOff } from 'react-icons/fi'
import { TbHeadphones } from 'react-icons/tb'
import { TbHeadphonesOff } from 'react-icons/tb'
import { Tooltip } from 'react-tooltip'

const AudioControl = () => {
  const anchorTagCSS =
    'w-6 h-6 mr-2 rounded-md flex justify-center items-center hover:bg-darkNavy hover:bg-opacity-20 transition-colors'
  return (
    <div className="bg-white bg-opacity-20 border border-accent border-opacity-50 flex pl-2 py-2 w-fit rounded-3xl shadow-foggyPink">
      <a id="willOffMic" className={anchorTagCSS}>
        <FiMic className="w-5 h-5" />
      </a>
      <Tooltip anchorSelect="#willOffMic" place="bottom">
        마이크 끄기
      </Tooltip>

      {/* <a id="willOnMic" className={anchorTagCSS}>
        <FiMicOff className="w-5 h-5 text-red-400" />
      </a>
      <Tooltip anchorSelect="#willOnMic" place="bottom">
        마이크 켜기
      </Tooltip> */}

      {/* <a id="willOffHeadphone" className={anchorTagCSS}>
        <TbHeadphones className="w-5 h-5" />
      </a>
      <Tooltip anchorSelect="#willOffHeadphone" place="bottom">
        헤드셋 소리 끄기
      </Tooltip> */}

      <a id="willOnHeadphone" className={anchorTagCSS}>
        <TbHeadphonesOff className="w-5 h-5 text-red-400" />
      </a>
      <Tooltip anchorSelect="#willOnHeadphone" place="bottom">
        헤드셋 소리 켜기
      </Tooltip>
    </div>
  )
}

export default AudioControl
