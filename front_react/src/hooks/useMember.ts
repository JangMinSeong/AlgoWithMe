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
    dispatch(setOnline(props))
  }

  const handleUnsetOnline = (props: string) => {
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
