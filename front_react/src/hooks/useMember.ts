import { useDispatch } from 'react-redux'
import {
  fetchAllMembers,
  setOnline,
  setOffline,
  setSpeaker,
  unsetSpeaker,
} from '@/features/study/memberSlice'
import fetch from '@/lib/fetch'
import { IMember } from '@/features/study/memberSlice'

const useMember = () => {
  const dispatch = useDispatch()

  const handleFetchAllMembers = async (groupId) => {
    await fetch(`/study/${groupId}/members`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((json) => dispatch(fetchAllMembers(json)))
  }

  const handleSetOnline = (props: IMember) => {
    dispatch(setOnline(props))
  }

  const handleSetOffline = (props: IMember) => {
    dispatch(setOffline(props))
  }

  const handleSetSpeaker = (nickname: string) => {
    dispatch(setSpeaker(nickname))
  }

  const handleUnsetSpeaker = (nickname: string) => {
    dispatch(unsetSpeaker(nickname))
  }

  return {
    handleFetchAllMembers,
    handleSetOnline,
    handleSetOffline,
    handleSetSpeaker,
    handleUnsetSpeaker,
  }
}

export default useMember
