import { useDispatch } from 'react-redux'
import {
  setOnline,
  unsetOnline,
  setSpeaker,
  unsetSpeaker,
} from '@/features/study/memberSlice'
import { IMember } from '@/features/study/memberSlice'

const useMember = () => {
  const dispatch = useDispatch()

  const handleSetOnline = (props: IMember) => {
    console.log('온라인추가', props)
    dispatch(setOnline(props))
  }

  const handleUnsetOnline = (props: string) => {
    console.log('오프라인됨', props)
    dispatch(unsetOnline(props))
  }

  const handleSetSpeaker = (nickname: string) => {
    dispatch(setSpeaker(nickname))
  }

  const handleUnsetSpeaker = (nickname: string) => {
    dispatch(unsetSpeaker(nickname))
  }

  return {
    handleSetOnline,
    handleUnsetOnline,
    handleSetSpeaker,
    handleUnsetSpeaker,
  }
}

export default useMember
