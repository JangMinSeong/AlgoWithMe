import { useDispatch } from 'react-redux'
import {
  addParticipant,
  removeParticipant,
  setActiveSpeaker,
  unsetActiveSpeaker,
} from '@/features/groupcall/callSlice'
import { IParticipant } from '@/features/groupcall/callSlice'

const useCall = () => {
  const dispatch = useDispatch()

  const handleAddParticipant = (prop: IParticipant) => {
    dispatch(addParticipant(prop))
  }

  const handleRemoveParticipant = (prop: string) => {
    dispatch(removeParticipant(prop))
  }

  const handleSetActiveSpeaker = (prop: string) => {
    dispatch(setActiveSpeaker(prop))
  }

  const handleUnsetActiveSpeaker = (prop: string) => {
    dispatch(unsetActiveSpeaker(prop))
  }
  return {
    handleAddParticipant,
    handleRemoveParticipant,
    handleSetActiveSpeaker,
    handleUnsetActiveSpeaker,
  }
}

export default useCall
